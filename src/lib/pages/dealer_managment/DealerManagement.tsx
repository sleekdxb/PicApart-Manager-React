import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../../components/CommonNavbar';

import eyeIcon from "../../../assets/images/Eye.png";
import ValueScoreCard from "./component/ValueScoreCard";
import DealerCard from "./component/DealerCard";
import { fetchPendingAccounts, fetchAccounts, type Account, type Vendor, fetchDealerStatistics, type TopDealer, type DealerScoring } from "../../../services/dealerManagementService";
import { getStoredAuth } from "../../../services/authService";


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
  
  // Dealer statistics state
  const [topDealers, setTopDealers] = useState<TopDealer[]>([]);
  const [dealerScoring, setDealerScoring] = useState<DealerScoring | null>(null);
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [statisticsError, setStatisticsError] = useState<string | null>(null);

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

  // Fetch dealer statistics
  useEffect(() => {
    let cancelled = false;
    async function loadStatistics() {
      const auth = getStoredAuth();
      if (!auth?.data?.staff?.staff_id) {
        setStatisticsError('Staff ID not found. Please login again.');
        return;
      }

      setStatisticsLoading(true);
      setStatisticsError(null);
      try {
        const res = await fetchDealerStatistics(auth.data.staff.staff_id);
        if (cancelled) return;
        
        console.log("[DealerManagement] Full API response:", JSON.stringify(res, null, 2));
        
        if (res.status && res.data && res.data.length > 0) {
          // Extract top dealers from all data items
          const dealers: TopDealer[] = [];
          let scoring: DealerScoring | null = null;
          
          res.data.forEach((item, idx) => {
            console.log(`[DealerManagement] Processing item ${idx}:`, JSON.stringify(item, null, 2));
            
            if (item.top_dealers) {
              const td: any = item.top_dealers as any;
              if (Array.isArray(td)) {
                console.log(`[DealerManagement] Item ${idx} - top_dealers is array with length`, td.length);
                dealers.push(...td);
              } else {
                console.log(`[DealerManagement] Item ${idx} - top_dealers is object`);
                dealers.push(td);
              }
            } else {
              console.warn(`[DealerManagement] Item ${idx} - No top_dealers found`);
            }
            
            // Use scoring from top_dealers or from item.scoring if available
            const tdForScore: any = item.top_dealers as any;
            if (tdForScore && !Array.isArray(tdForScore) && tdForScore.scoring) {
              console.log(`[DealerManagement] Item ${idx} - Scoring from top_dealers:`, JSON.stringify(tdForScore.scoring, null, 2));
              scoring = tdForScore.scoring;
            } else if (item.scoring) {
              console.log(`[DealerManagement] Item ${idx} - Scoring from item:`, JSON.stringify(item.scoring, null, 2));
              scoring = item.scoring;
            }
          });
          
          // Fallback: if scoring not set yet and we have dealers (array case), use first dealer's scoring
          if (!scoring && dealers.length > 0 && (dealers[0] as any)?.scoring) {
            console.log('[DealerManagement] Using scoring from first dealer as fallback');
            scoring = (dealers[0] as any).scoring as DealerScoring;
          }
          
          console.log("[DealerManagement] Extracted dealers array:", JSON.stringify(dealers, null, 2));
          console.log("[DealerManagement] Extracted scoring:", JSON.stringify(scoring, null, 2));
          
          // Verify each dealer's activity values before setting state
          dealers.forEach((dealer, idx) => {
            console.log(`[DealerManagement] Final dealer ${idx} before setState:`, {
              vendor_name: dealer.vendor_name,
              activity: {
                total_requests: dealer.activity?.total_requests,
                match_rate: dealer.activity?.match_rate,
                contact_rate: dealer.activity?.contact_rate,
                logins: dealer.activity?.logins
              }
            });
          });
          
          setTopDealers(dealers);
          setDealerScoring(scoring);
        } else {
          console.warn("[DealerManagement] No data received or invalid response:", res);
        }
      } catch (e: any) {
        if (cancelled) return;
        console.error("[DealerManagement] Error loading statistics:", e);
        setStatisticsError(e?.message || 'Failed to load dealer statistics');
        setTopDealers([]);
        setDealerScoring(null);
      } finally {
        if (!cancelled) setStatisticsLoading(false);
      }
    }
    loadStatistics();
    return () => { cancelled = true; };
  }, []);



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
        className={`p-6 mt-10 transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
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
                    <th className="font-semibold">STATE</th>
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
                  ) : (() => {
                    // Filter accounts to only include those with non-empty vendor_state
                    const filteredAccounts = accounts.filter((acc) => {
                      const vendor = Array.isArray(acc.vendor) && acc.vendor.length > 0 ? acc.vendor[0] : undefined;
                      const vendorState = Array.isArray(vendor?.vendor_state) && vendor.vendor_state.length > 0 ? vendor.vendor_state[0] : undefined;
                      return vendorState !== undefined;
                    });

                    if (filteredAccounts.length === 0) {
                      return <tr><td colSpan={7} className="py-6 text-center text-gray-500">No records with state information</td></tr>;
                    }

                    return filteredAccounts.map((acc) => {
                      const vendor = Array.isArray(acc.vendor) && acc.vendor.length > 0 ? acc.vendor[0] : undefined;
                      const vendorState = Array.isArray(vendor?.vendor_state) && vendor.vendor_state.length > 0 ? vendor.vendor_state[0] : undefined;
                      
                      const businessName = vendor?.business_name || '-';
                      const stateName = vendorState?.state_name || '-';
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

                          {/* state name */}
                          <td className="py-3">
                            <div className="flex flex-col">
                              <div className="text-sm text-gray-500">{stateName}</div>
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
                    });
                  })()}
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
          {statisticsLoading ? (
            <div className="text-center py-4 text-gray-500">Loading scoring data...</div>
          ) : statisticsError ? (
            <div className="text-center py-4 text-red-500">{statisticsError}</div>
          ) : dealerScoring ? (
            (() => {
              // Log scoring values to verify they're correct
              console.log("[DealerManagement] Scoring values from API:", JSON.stringify(dealerScoring, null, 2));
              console.log("[DealerManagement] Listing Quality:", dealerScoring["Listing Quality"]);
              console.log("[DealerManagement] Responsiveness:", dealerScoring["Responsiveness"]);
              console.log("[DealerManagement] Engagement:", dealerScoring["Engagement"]);
              console.log("[DealerManagement] Stock Update Rate:", dealerScoring["Stock Update Rate"]);
              
              // Use exact values from API - NO transformation
              const listingQuality = dealerScoring["Listing Quality"] ?? 0;
              const responsiveness = dealerScoring["Responsiveness"] ?? 0;
              const engagement = dealerScoring["Engagement"] ?? 0;
              const stockUpdateRate = dealerScoring["Stock Update Rate"] ?? 0;
              const overallScore = Math.round((listingQuality + responsiveness + engagement + stockUpdateRate) / 4);
              
              console.log("[DealerManagement] Using scoring values:", {
                listingQuality,
                responsiveness,
                engagement,
                stockUpdateRate,
                overallScore
              });
              
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <ValueScoreCard 
                    title="Listing Quality" 
                    score={String(listingQuality)} 
                    subtitle="Based on images & descriptions completeness" 
                  />
                  <ValueScoreCard 
                    title="Responsiveness" 
                    score={String(responsiveness)} 
                    subtitle="Average time to first contact" 
                  />
                  <ValueScoreCard 
                    title="Engagement" 
                    score={String(engagement)} 
                    subtitle="Login frequency & stock updates" 
                  />
                  <ValueScoreCard 
                    title="Overall Score" 
                    score={String(overallScore)} 
                    subtitle="Average of all scoring metrics" 
                  />
                </div>
              );
            })()
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <ValueScoreCard title="Listing Quality" score="0" subtitle="Based on images & descriptions completeness" />
              <ValueScoreCard title="Responsiveness" score="0" subtitle="Average time to first contact" />
              <ValueScoreCard title="Engagement" score="0" subtitle="Login frequency & stock updates" />
              <ValueScoreCard title="Overall Score" score="0" subtitle="Average of all scoring metrics" />
            </div>
          )}
        </div>

        {/* ============== top dealers ============*/}
        <div className="mt-4">
          <div className="flex justify-between">
            <h3 className="text-md font-semibold text-black">Top Dealers</h3>
            <button onClick={handleViewTopDealers}
              className="px-2 py-3  font-semibold text-sm text-[#028174]">View More</button>
          </div>
          {statisticsLoading ? (
            <div className="text-center py-4 text-gray-500">Loading top dealers...</div>
          ) : statisticsError ? (
            <div className="text-center py-4 text-red-500">{statisticsError}</div>
          ) : topDealers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Show only first 3 dealers */}
              {topDealers.slice(0, 3).map((dealer, index) => {
                // Log the dealer data to verify it's correct
                console.log(`[DealerManagement] Rendering dealer ${index}:`, JSON.stringify(dealer, null, 2));
                console.log(`[DealerManagement] Activity data:`, JSON.stringify(dealer.activity, null, 2));
                
                // Extract activity values directly - use exact values from API, no transformation
                const activity = dealer.activity;
                if (!activity) {
                  console.error(`[DealerManagement] No activity data for dealer ${index}`);
                }
                
                // Get exact raw values directly from dealer.activity - NO CALCULATION, NO TRANSFORMATION
                // Log direct access to verify values
                console.log(`[DealerManagement] Dealer ${index} - Direct access:`);
                console.log(`  dealer.activity.total_requests = ${dealer.activity?.total_requests}`);
                console.log(`  dealer.activity.match_rate = ${dealer.activity?.match_rate}`);
                console.log(`  dealer.activity.contact_rate = ${dealer.activity?.contact_rate}`);
                console.log(`  dealer.activity.logins = ${dealer.activity?.logins}`);
                
                // Calculate average rating from scoring (0-5 scale)
                // Add null checks for scoring to prevent errors
                const scoring = dealer.scoring || {};
                const listingQuality = scoring["Listing Quality"] || 0;
                const responsiveness = scoring["Responsiveness"] || 0;
                const engagement = scoring["Engagement"] || 0;
                const stockUpdateRate = scoring["Stock Update Rate"] || 0;
                
                const avgScore = Math.round(
                  (listingQuality + responsiveness + engagement + stockUpdateRate) / 4
                );
                // Determine plan based on score or default to "Pro"
                const planLabel = avgScore >= 4 ? "Premium" : avgScore >= 3 ? "Pro" : "Basic";
                const planClassName = 
                  planLabel === "Premium" 
                    ? "px-2 py-3 mt-2 text-sm text-[#9333EA] bg-[#F2E7FF] border rounded"
                    : planLabel === "Pro"
                    ? "px-4 py-3 mt-2 text-sm text-[#3E38DA] bg-[#DBEAFE] border rounded"
                    : "px-4 py-3 mt-2 text-sm text-[#CA8A04] bg-[#FEF9C3] border rounded";
                
                // Format login date - the API returns '25-10-19 12:42:07' format
                const formatLoginDate = (loginStr: string) => {
                  if (!loginStr) return 'N/A';
                  // Try to parse the date string format 'DD-MM-YY HH:MM:SS'
                  try {
                    const [datePart, timePart] = loginStr.split(' ');
                    const [day, month, year] = datePart.split('-');
                    // Convert YY to YYYY
                    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
                    const date = new Date(`${fullYear}-${month}-${day} ${timePart}`);
                    if (!isNaN(date.getTime())) {
                      return date.toLocaleDateString();
                    }
                  } catch (e) {
                    // If parsing fails, return the original string
                  }
                  return loginStr;
                };
                
                // Transform TopDealer to Account-like structure for navigation
                const handleViewClick = async () => {
                  // First, try to find the full account from pending accounts by matching vendor_id
                  let accountData: Account | null = null;
                  
                  // Search in existing accounts array
                  for (const acc of accounts) {
                    const vendor = Array.isArray(acc.vendor) && acc.vendor.length > 0 ? acc.vendor[0] : undefined;
                    if (vendor?.vend_id === dealer.vendor_id) {
                      accountData = acc;
                      break;
                    }
                  }
                  
                  // If not found in current accounts, try to fetch it
                  if (!accountData) {
                    try {
                      // Try to fetch accounts and search for matching vendor_id
                      const allAccountsResponse = await fetchAccounts(100, 1);
                      if (allAccountsResponse?.data) {
                        for (const acc of allAccountsResponse.data) {
                          const vendor = Array.isArray(acc.vendor) && acc.vendor.length > 0 ? acc.vendor[0] : undefined;
                          if (vendor?.vend_id === dealer.vendor_id) {
                            accountData = acc;
                            break;
                          }
                        }
                      }
                      
                      // If still not found, try more pages
                      if (!accountData && allAccountsResponse?.last_page && allAccountsResponse.last_page > 1) {
                        for (let page = 2; page <= Math.min(allAccountsResponse.last_page, 10); page++) {
                          const pageResponse = await fetchAccounts(100, page);
                          if (pageResponse?.data) {
                            for (const acc of pageResponse.data) {
                              const vendor = Array.isArray(acc.vendor) && acc.vendor.length > 0 ? acc.vendor[0] : undefined;
                              if (vendor?.vend_id === dealer.vendor_id) {
                                accountData = acc;
                                break;
                              }
                            }
                            if (accountData) break;
                          }
                        }
                      }
                    } catch (error) {
                      console.error('[DealerManagement] Error fetching account data:', error);
                    }
                  }
                  
                  // If still not found, create a complete Account structure from TopDealer data
                  if (!accountData) {
                    const vendorData: Vendor = {
                      id: 0,
                      acc_id: dealer.vendor_id || '',
                      vend_id: dealer.vendor_id || '',
                      business_name: dealer.vendor_name || null,
                      address: null,
                      location: null,
                      long: null,
                      lat: null,
                      country: null,
                      official_email: dealer.email || null,
                      official_phone: null,
                      owner_id_number: null,
                      owner_id_full_name: null,
                      trade_license_number: null,
                      profile_doc_state_array_id: null,
                      state_position: null,
                      state_id: null,
                      files_id_array: [],
                      main: 1,
                      total_listing: 0,
                      TotalListingRequested: 0,
                      total_listing_conver: null,
                      listing_performance: {},
                      total_imperssions: 0,
                      total_clikcs: 0,
                      total_branches: 0,
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                      sub_statistic: {
                        login: dealer.activity?.logins ? String(dealer.activity.logins) : undefined,
                        request_part_count: dealer.activity?.total_requests ? String(dealer.activity.total_requests) : undefined,
                        total_match: dealer.activity?.match_rate ? String(dealer.activity.match_rate) : undefined,
                        chat_call_count: undefined,
                        contact_rate: dealer.activity?.contact_rate ? String(dealer.activity.contact_rate) : undefined,
                        last_active: dealer.activity?.logins || undefined,
                      },
                      media_files: [],
                      vendor_state: [],
                    };
                    
                    accountData = {
                      acc_id: dealer.vendor_id || '',
                      email: dealer.email || null,
                      phone: null,
                      account_type: null,
                      action_state_id: null,
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                      vendor: [vendorData],
                      memberships: [],
                      session: [],
                      account_states: [],
                    };
                  }
                  
                  navigate('/dealer-management/AccountOwner', { state: { account: accountData } });
                };
                
                return (
                  <DealerCard
                    key={dealer.vendor_id || index}
                    name={dealer.vendor_name || '-'}
                    email={dealer.email || '-'}
                    rating={avgScore}
                    metrics={[
                      // Use exact value directly from dealer.activity - NO calculation
                      { label: 'Requests', value: String(dealer.activity?.total_requests ?? 0) },
                      // Use exact value directly from dealer.activity with % sign - NO calculation
                      { label: 'Contact Rate', value: `${String(dealer.activity?.contact_rate ?? 0)}%` },
                      // Use exact value directly from dealer.activity with % sign - NO calculation
                      { label: 'Match Rate', value: `${String(dealer.activity?.match_rate ?? 0)}%` },
                      { label: 'Last Login', value: dealer.activity?.logins ? formatLoginDate(dealer.activity.logins) : 'N/A' },
                    ]}
                    planLabel={planLabel}
                    planClassName={planClassName}
                    onViewClick={handleViewClick}
                    eyeIcon={eyeIcon}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">No top dealers data available</div>
          )}
        </div>

      </main>
    </div>
  )
}
