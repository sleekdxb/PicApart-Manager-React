import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../../components/CommonNavbar';

import eyeIcon from "../../../assets/images/Eye.png";
import ValueScoreCard from "./component/ValueScoreCard";
import DealerCard from "./component/DealerCard";
import { fetchPendingAccounts, type Account } from "../../../services/dealerManagementService";


// API-backed data replaces previous dummy table rows


export default function DealerManagement() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchPendingAccounts(perPage, currentPage);
        if (cancelled) return;
        setAccounts(res.data || []);
        setTotalResults(res.total || 0);
        setLastPage(res.last_page || 1);
        setFromIdx(res.from || 0);
        setToIdx(res.to || 0);
        setSuccess(`Fetched ${res.data?.length ?? 0} records`);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || 'Failed to load accounts');
        setSuccess(null);
        setAccounts([]);
        setTotalResults(0);
        setLastPage(1);
        setFromIdx(0);
        setToIdx(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [perPage, currentPage]);



  const handleViewTopDealers = () => {
    navigate('/dealer-management/TopDealers');
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* === Sidebar === */}
      <Sidebar
        collapsed={collapsed}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* === Navbar with Toggle Button === */}
      <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title="Dealer Management" />

      {/* === Main Content === */}

      <main
        className={`p-6 mt-10 transition-all duration-300 ${collapsed ? "md:ml-20" : "md:ml-64"
          }`}
      >


        {/* === Pending Approvals Table === */}
        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          <div className="bg-white rounded-lg border border-gray-100 shadow p-4 flex-1">
            <div className="-mx-4 px-4 border-b pb-2 mb-4 flex flex-col lg:flex-row justify-between items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900 w-full lg:w-auto">
                Pending Approvals
              </h2>


              {/* === actions pending Button === */}
              <button
                className="flex items-center gap-2 bg-[#ecf3fe] text-[#3E38DA] px-4 py-2 rounded-full text-sm ">
                {loading ? 'Loading...' : `${accounts.length} actions pending`}
              </button>
            </div>


            {/* ==== table === */}
            <div className="bg-white rounded-lg border border-gray-100 shadow p-4 overflow-x-auto">
              {error ? (
                <div className="mb-3 text-sm text-red-50 bg-red-500/40 border border-red-400 rounded px-3 py-2">
                  {error}
                </div>
              ) : null}
              {!error && success ? (
                <div className="mb-3 text-sm text-emerald-900 bg-emerald-200/70 border border-emerald-300 rounded px-3 py-2">
                  {success}
                </div>
              ) : null}
              <table className="min-w-[850px] w-full text-sm text-left border-collapse">
                <thead className="text-gray-600 border-b bg-[#ecf3fe]">
                  <tr>
                    <th className="font-semibold">BUSINESS NAME</th>
                    <th className="font-semibold">TYPE</th>
                    <th className="font-semibold">CONTACT PERSON</th>
                    <th className="font-semibold">SUBSCRIPTION</th>
                    <th className="font-semibold">SUBMITTED ON</th>
                    <th className="font-semibold">DOCUMENTS</th>
                    <th className="text-center font-semibold">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7} className="py-6 text-center text-gray-500">Loading...</td></tr>
                  ) : error ? (
                    <tr><td colSpan={7} className="py-6 text-center text-red-600">{error}</td></tr>
                  ) : accounts.length === 0 ? (
                    <tr><td colSpan={7} className="py-6 text-center text-gray-500">No records</td></tr>
                  ) : accounts.map((acc) => {
                    const vendor = Array.isArray(acc.vendor) && acc.vendor.length > 0 ? acc.vendor[0] : undefined;
                    const businessName = vendor?.business_name || '-';
                    const type = acc.account_type || '-';
                    const contactFirst = (acc as any).firstName || (acc as any).first_name || '';
                    const contactLast = (acc as any).lastName || (acc as any).last_name || '';
                    const contactName = [contactFirst, contactLast].filter(Boolean).join(' ') || '-';
                    const contactEmail = acc.email || '-';
                    const membership = Array.isArray(acc.memberships) && acc.memberships.length > 0 ? acc.memberships[0] : undefined;
                    const subscription = membership?.type || '-';
                    const submittedOn = (acc.created_at || '').split('T')[0] || '-';
                    const documentsCount = Array.isArray(vendor?.media_files) ? vendor.media_files.length : (Array.isArray(vendor?.files_id_array) ? vendor.files_id_array.length : 0);
                    return (
                      <tr
                        key={acc.acc_id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        {/* business name */}
                        <td className="text-gray-700">{businessName}</td>



                        {/* client type */}
                        <td className="py-3">
                          <div className="flex flex-col">
                            <div className="text-sm text-gray-500">{type}</div>
                          </div>
                        </td>


                        {/* Contact */}
                        <td>
                          <div className="flex flex-col  justify-center">
                            <h3 className="text-sm text-center text-gray-500">{contactName}</h3>
                            <div className="text-sm text-gray-500 text-left">{contactEmail}</div>
                          </div>
                        </td>



                        {/* subscription */}
                        <td>
                          <span
                            className={`px-3 py-2 text-xs font-medium rounded ${subscription === "premium"
                              ? "bg-[#F2E7FF] text-[#9333EA]"
                              : subscription === "pro"
                                ? "bg-[#DBEAFE] text-[#3E38DA]"
                                : subscription === "basic"
                                  ? "bg-[#FEF9C3] text-[#CA8A04]"
                                  : "bg-[#FEF9C3] text-[#CA8A04]"

                              }`}
                          >
                            {subscription}
                          </span>
                        </td>

                        {/* date of submission */}
                        <td>{submittedOn}</td>


                        {/* documents */}
                        <td>
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded ${documentsCount >= 1
                              ? "bg-[#DBEAFE] text-[#3E38DA]"
                              : "bg-[#DBEAFE] text-[#3E38DA]"
                              }`}
                          >
                            {documentsCount} files
                          </span>
                        </td>



                        {/* Action */}
                        <td className="text-center">
                          <button onClick={() => navigate('/dealer-management/AccountOwner', { state: { account: acc } })}
                            className="flex justify-center items-center mx-auto hover:opacity-80 transition">
                            <img src={eyeIcon} alt="View" className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* === Pagination section === */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <p>
                Showing {fromIdx} to {toIdx} of {totalResults} results
              </p>

              {/* === Pagination buttons === */}
              <div className="flex justify-center items-center gap-2 mt-4 text-sm text-gray-700">

                {/* Previous Button */}
                <button
                  className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                  disabled={currentPage === 1 || loading}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  &lt;
                </button>

                {/* Always show first 3 pages */}
                {[1, 2, 3].filter(p => p <= lastPage).map((page) => (
                  <button
                    key={page}
                    onClick={() => !loading && setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-md transition-all ${currentPage === page
                      ? "bg-[#00435A] text-white border-[#00435A]"
                      : "hover:bg-gray-100 text-gray-700"
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {page}
                  </button>
                ))}

                {/* Ellipsis */}
                {lastPage > 4 && <span className="px-2 text-gray-500">...</span>}

                {/* Last Page  */}
                <button
                  onClick={() => !loading && setCurrentPage(lastPage)}
                  className={`px-3 py-1 border rounded-md transition-all ${currentPage === lastPage
                    ? "bg-[#00435A] text-white border-[#00435A]"
                    : "hover:bg-gray-100 text-gray-700"
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {lastPage}
                </button>

                {/* Next Button */}
                <button
                  className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                  disabled={currentPage === lastPage || loading}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
                >
                  &gt;
                </button>
              </div>


              {/* === rows per page section === */}
              <div className="flex items-center justify-end gap-3 mt-4 text-sm">
                <p className="text-gray-700  ">Rows per page</p>
                <select
                  className="border  border-gray-300 rounded-md px-2 py-3"
                  value={perPage}
                  onChange={(e) => { if (loading) return; setCurrentPage(1); setPerPage(Number(e.target.value) || 10); }}
                  disabled={loading}
                >
                  {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* ============ Dealer Value Scoring ============ */}
        <div className="mt-4 ">
          <div className="text-md text-black font-semibold">Dealer Value Scoring</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <ValueScoreCard title="Listing Quality" score="4/5" subtitle="Based on images & descriptions completeness" />
            <ValueScoreCard title="Responsiveness" score="5/5" subtitle="Average time to first contact" />
            <ValueScoreCard title="Engagement" score="5/5" subtitle="Login frequency & stock updates" />
            <ValueScoreCard title="Overall Score" score="5/5" subtitle="Login frequency & stock updates" />
          </div>

          {/* ============== top dealers ============*/}
          <div className="mt-4 flex justify-between">
            <h3 className="text-md font-semibold text-black">Top Dealers</h3>
            <button onClick={handleViewTopDealers}
              className="px-2 py-3  font-semibold text-sm text-[#028174]">View More</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <DealerCard
              name="Listing Quality"
              email="contact@germanparts.com"
              rating={5}
              metrics={[
                { label: 'Requests', value: '142' },
                { label: 'Contact Rate', value: '92%' },
                { label: 'Match Rate', value: '78%' },
                { label: 'Logins', value: 'Daily' },
              ]}
              planLabel="Premium"
              planClassName="px-2 py-3 mt-2 text-sm text-[#9333EA] bg-[#F2E7FF] border rounded"
            />
            <DealerCard
              name="Tyre Experts Ltd"
              email="sales@tyreexperts.com"
              rating={2}
              metrics={[
                { label: 'Requests', value: '38' },
                { label: 'Contact Rate', value: '84%' },
                { label: 'Match Rate', value: '65%' },
                { label: 'Logins', value: 'Weekly' },
              ]}
              planLabel="Pro"
              planClassName="px-4 py-3 mt-2 text-sm text-[#3E38DA] bg-[#DBEAFE] border rounded"
            />
            <DealerCard
              name="Auto Parts Warehouse"
              email="info@autopartswh.com"
              rating={3}
              metrics={[
                { label: 'Requests', value: '210' },
                { label: 'Contact Rate', value: '72%' },
                { label: 'Match Rate', value: '45%' },
                { label: 'Logins', value: 'Daily' },
              ]}
              planLabel="Basic"
              planClassName="px-4 py-3 mt-2 text-sm text-[#9333EA] bg-[#F2E7FF] border rounded"
            />
          </div>

        </div>

      </main>
    </div>
  )
}
