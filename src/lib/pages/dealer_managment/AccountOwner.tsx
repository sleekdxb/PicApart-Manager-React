

// import { useEffect, useMemo, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Sidebar from '../../../components/Sidebar';
// import CommonNavbar from '../../../components/CommonNavbar';

// import johnsmith from "../../../assets/images/John Smith.png";
// import pdf from "../../../assets/images/pdf.png";
// import MetricStatCard from "./component/MetricStatCard";
// import type { Account, Vendor, Membership, Session, AccountState, MediaFile } from "../../../services/dealerManagementService";
// import { updateVendorAccountProfile, type UpdateVendorAccountProfilePayload } from "../../../services/dealerManagementService";
// import DocumentCard from "./component/DocumentCard";
// function getStaffIdFromStorage(): string | undefined {
//   try {
//     const raw = localStorage.getItem('staffAuth');
//     if (!raw) return undefined;
//     const obj = JSON.parse(raw);
//     return obj?.data?.staff?.staff_id;
//   } catch {
//     return undefined;
//   }
// }
// export default function AccountOwner() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const navState = (location as any)?.state as { account?: Account } | undefined;
//   const account = navState?.account;
//   const vendor: Vendor | undefined = Array.isArray(account?.vendor) && account!.vendor!.length > 0 ? account!.vendor![0] : undefined;
//   const membership: Membership | undefined = Array.isArray(account?.memberships) && account!.memberships!.length > 0 ? account!.memberships![0] : undefined;
//   const latestSession: Session | undefined = Array.isArray(account?.session) && account!.session!.length > 0 ? account!.session![0] : undefined;
//   const latestAccountState: AccountState | undefined = Array.isArray(account?.account_states) && account!.account_states!.length > 0 ? account!.account_states!.slice(-1)[0] : undefined;

//   const [accountStatus, setAccountStatus] = useState<string>((latestAccountState?.state_name || '').toLowerCase());
//   const [accountStatusReasonMsg, setAccountStatusReasonMsg] = useState<string>(""); void accountStatusReasonMsg;

//   function getAccountStatusMessage(status: string): string {
//     const s = (status || '').toLowerCase();
//     switch (s) {
//       case 'approved': return 'Your Profile Is Approved';
//       case 'pending': return 'Your Profile Is Under Review.';
//       case 'rejected': return 'Your Profile has been Rejected';
//       case 'amendment': return 'Your Profile Need Amendment';
//       default: return 'Under Review';
//     }
//   }

//   useEffect(() => {
//     const current = (latestAccountState?.state_name || '').toLowerCase();
//     setAccountStatus(current);
//     setAccountStatusReasonMsg(getAccountStatusMessage(current));
//     try { console.log('[AccountOwner] account_state:init', { state_name: current, state_code: 'ACC', reason: getAccountStatusMessage(current) }); } catch { }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [latestAccountState?.state_name]);

//   // ====== Helpers ======
//   function allFiles(): MediaFile[] {
//     return Array.isArray(vendor?.media_files) ? vendor!.media_files! : [];
//   }
//   function findMediaByPrefix(prefixes: string[]): MediaFile | undefined {
//     const files = allFiles();
//     const lowerPrefixes = prefixes.map(p => p.toLowerCase());
//     return files.find((f) => {
//       const name = (f.file_name || '').toLowerCase();
//       return lowerPrefixes.some(p => name.startsWith(p));
//     });
//   }
//   function findMediaByIncludes(parts: string[]): MediaFile | undefined {
//     const files = allFiles();
//     const lowerParts = parts.map(p => p.toLowerCase());
//     return files.find((f) => {
//       const name = (f.file_name || '').toLowerCase();
//       return lowerParts.every(p => name.includes(p));
//     });
//   }
//   function findMediaByAnyPattern(patternSets: string[][]): MediaFile | undefined {
//     for (const parts of patternSets) {
//       const found = findMediaByIncludes(parts);
//       if (found) return found;
//     }
//     return undefined;
//   }

//   // ====== Account Owner Documents (same) ======
//   const dlFront = findMediaByPrefix(["em_front", "em front", "em-front"]);
//   const dlBack = findMediaByPrefix(["em_back", "em back", "em-back"]);
//   const passportDoc = findMediaByPrefix(["passport_0", "passport", "pp_", "pp-"]);

//   // ====== Business Documents detection
//   // Your filenames: "Proof_...", "Tax_...", "Trad_..." (case-insensitive)
//   const isTrade = (f: MediaFile) => {
//     const name = (f.file_name || '').toLowerCase();
//     return (
//       name.startsWith('trad_') ||
//       (name.includes('trade') && (name.includes('licen') || name.includes('license') || name.includes('licence'))) ||
//       name === 'tl' || name.startsWith('tl')
//     );
//   };
//   const isTax = (f: MediaFile) => {
//     const name = (f.file_name || '').toLowerCase();
//     return (
//       name.startsWith('tax_') ||
//       name === 'tax' ||
//       name.includes(' tax') ||
//       name.includes('tax ') ||
//       name.includes('trn') ||
//       name.includes('vat') ||
//       (name.includes('tax') && (name.includes('reg') || name.includes('registration')))
//     );
//   };
//   const isPOA = (f: MediaFile) => {
//     const name = (f.file_name || '').toLowerCase();
//     return (
//       name.startsWith('proof_') ||
//       (name.includes('proof') && name.includes('address')) ||
//       name.includes('poa') ||
//       (name.includes('address') && name.includes('proof'))
//     );
//   };

//   // Legacy singles (keep them so nothing disappears)
//   const tradeLicenseSingle = findMediaByAnyPattern([
//     ["trad_"], ["trade", "licen"], ["trade", "license"], ["trade", "licence"], ["tl"]
//   ]);
//   const taxRegistrationSingle =
//     findMediaByPrefix(["tax_", "tax", "trn", "vat"]) ||
//     findMediaByIncludes(["tax"]) ||
//     findMediaByAnyPattern([["tax", "reg"], ["tax", "registration"], ["trn"]]);
//   const proofOfAddressSingle = findMediaByAnyPattern([
//     ["proof_"], ["proof", "address"], ["poa"], ["address", "proof"]
//   ]);

//   // Collect ALL business docs + seed with singles; de-dupe by acc_media_id
//   const businessFiles = useMemo(() => {
//     const files = allFiles();
//     const matched = files.filter(f => isTrade(f) || isTax(f) || isPOA(f));

//     if (tradeLicenseSingle) matched.push(tradeLicenseSingle);
//     if (taxRegistrationSingle) matched.push(taxRegistrationSingle);
//     if (proofOfAddressSingle) matched.push(proofOfAddressSingle);

//     const byId = new Map<string, MediaFile>();
//     for (const f of matched) {
//       if (f?.acc_media_id) byId.set(f.acc_media_id, f);
//     }
//     const out = Array.from(byId.values());
//     out.sort((a, b) => (a.file_name || '').localeCompare(b.file_name || ''));
//     return out;
//   }, [vendor?.media_files, tradeLicenseSingle, taxRegistrationSingle, proofOfAddressSingle]);

//   function businessKindLabel(f: MediaFile): 'Trade Licence' | 'Tax Registration' | 'Proof of Address' | 'Business Document' {
//     if (isTrade(f)) return 'Trade Licence';
//     if (isTax(f)) return 'Tax Registration';
//     if (isPOA(f)) return 'Proof of Address';
//     return 'Business Document';
//   }

//   // ====== Owner doc per-card state (unchanged) ======
//   const [dlFrontStatus, setDlFrontStatus] = useState("");
//   const [dlFrontReason, setDlFrontReason] = useState("");
//   const [dlBackStatus, setDlBackStatus] = useState("");
//   const [dlBackReason, setDlBackReason] = useState("");
//   const [passportStatus, setPassportStatus] = useState("");
//   const [passportReason, setPassportReason] = useState("");

//   // ====== Business docs per-file state (status + reason each) ======
//   type PerFileState = Record<string, { status: string; reason: string }>;
//   const [bizDocState, setBizDocState] = useState<PerFileState>({});

//   // Ensure state entries for visible files; drop stale ones
//   useEffect(() => {
//     setBizDocState(prev => {
//       const next: PerFileState = { ...prev };
//       for (const f of businessFiles) {
//         if (!next[f.acc_media_id]) next[f.acc_media_id] = { status: "", reason: "" };
//       }
//       for (const k of Object.keys(next)) {
//         if (!businessFiles.some(f => f.acc_media_id === k)) delete next[k];
//       }
//       return next;
//     });
//   }, [businessFiles]);

//   // ====== format helpers ======
//   function toTitleCase(value: string): string {
//     const s = (value || '').trim();
//     if (!s) return '';
//     return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
//   }
//   function formatYMD(value?: string | null): string {
//     if (!value) return '—';
//     const match = value.match(/\d{4}-\d{2}-\d{2}/);
//     if (match) return match[0];
//     const d = new Date(value);
//     if (isNaN(d.getTime())) return value;
//     const y = d.getFullYear();
//     const m = String(d.getMonth() + 1).padStart(2, '0');
//     const day = String(d.getDate()).padStart(2, '0');
//     return `${y}-${m}-${day}`;
//   }
  
//   function formatLastActive(value?: string | null): string {
//     if (!value) return '—';
    
//     // Try to parse the date - handle various formats
//     let date: Date | null = null;
    
//     // First try standard parsing
//     const standardDate = new Date(value);
//     if (!isNaN(standardDate.getTime())) {
//       date = standardDate;
//     }
    
//     // If parsing failed, try to fix common malformed dates
//     if (!date || isNaN(date.getTime())) {
//       // Handle formats like "25-11-01 12:00:00" (YY-MM-DD HH:MM:SS)
//       const parts = value.trim().split(/[\s-:]/);
//       if (parts.length >= 3) {
//         const year = parseInt(parts[0]);
//         const month = parseInt(parts[1]);
//         const day = parseInt(parts[2]);
        
//         // If year is 2 digits, assume 20XX
//         let fullYear = year;
//         if (year < 100 && year >= 0) {
//           fullYear = year < 50 ? 2000 + year : 1900 + year;
//         }
        
//         // If there are time parts, include them
//         if (parts.length >= 6) {
//           const hour = parseInt(parts[3]) || 0;
//           const minute = parseInt(parts[4]) || 0;
//           const second = parseInt(parts[5]) || 0;
//           date = new Date(fullYear, month - 1, day, hour, minute, second);
//         } else {
//           date = new Date(fullYear, month - 1, day);
//         }
//       }
//     }
    
//     if (!date || isNaN(date.getTime())) {
//       return '—';
//     }
    
//     // Check if date is today or not - normalize both to midnight for comparison
//     const now = new Date();
//     const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
//     const valueDateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    
//     const isToday = todayMidnight.getTime() === valueDateMidnight.getTime();
    
//     if (isToday) {
//       // If date is TODAY, calculate and show hours
//       const diffTime = now.getTime() - date.getTime();
//       const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      
//       if (diffHours === 0) {
//         const diffMinutes = Math.floor(diffTime / (1000 * 60));
//         if (diffMinutes === 0) {
//           return 'Just now';
//         } else if (diffMinutes === 1) {
//           return '1 minute ago';
//         } else {
//           return `${diffMinutes} minutes ago`;
//         }
//       } else if (diffHours === 1) {
//         return '1 hour ago';
//       } else {
//         return `${diffHours} hours ago`;
//       }
//     } else {
//       // If date is NOT today, show days ONLY (no hours) - calculate based on date difference
//       const diffTime = todayMidnight.getTime() - valueDateMidnight.getTime();
//       const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
//       if (diffDays < 0) {
//         // Future date
//         return 'Today';
//       } else if (diffDays === 0) {
//         // Should not happen but fallback
//         return 'Today';
//       } else if (diffDays === 1) {
//         return '1 day ago';
//       } else {
//         return `${diffDays} days ago`;
//       }
//     }
//   }

//   // ====== live file_state preview in console ======
//   useEffect(() => {
//     function makeEntry(file?: MediaFile, status?: string, reason?: string) {
//       if (!file || !status) return null;
//       const selectedStatus = String(status).trim();
//       return {
//         acc_media_id: file.acc_media_id,
//         note: "",
//         reason: selectedStatus.toLowerCase() === 'rejected' ? (reason || "") : "",
//         state_code: "DOCS",
//         state_name: selectedStatus.toLowerCase(),
//       };
//     }

//     const ownerItems = [
//       makeEntry(dlFront, dlFrontStatus, dlFrontReason),
//       makeEntry(dlBack, dlBackStatus, dlBackReason),
//       makeEntry(passportDoc, passportStatus, passportReason),
//     ].filter(Boolean);

//     const businessItems = businessFiles.map(f => {
//       const s = bizDocState[f.acc_media_id]?.status || "";
//       const r = bizDocState[f.acc_media_id]?.reason || "";
//       return makeEntry(f, s, r);
//     }).filter(Boolean);

//     const items = [...ownerItems, ...businessItems];
//     try { console.log('[AccountOwner] file_state', { file_state: items }); } catch { }
//   }, [
//     // owner
//     dlFrontStatus, dlFrontReason,
//     dlBackStatus, dlBackReason,
//     passportStatus, passportReason,
//     dlFront, dlBack, passportDoc,
//     // business
//     bizDocState, businessFiles
//   ]);

//   // ====== payload builder ======
//   function buildFileState(): UpdateVendorAccountProfilePayload['file_state'] {
//     function makeEntry(file?: MediaFile, status?: string, reason?: string) {
//       if (!file || !status) return null;
//       const selectedStatus = String(status).trim().toLowerCase();
//       return {
//         acc_media_id: file.acc_media_id,
//         note: "",
//         reason: selectedStatus === 'rejected' ? (reason || "") : "",
//         state_code: "DOCS",
//         state_name: selectedStatus,
//       };
//     }

//     const owner = [
//       makeEntry(dlFront, dlFrontStatus, dlFrontReason),
//       makeEntry(dlBack, dlBackStatus, dlBackReason),
//       makeEntry(passportDoc, passportStatus, passportReason),
//     ].filter(Boolean) as UpdateVendorAccountProfilePayload['file_state'];

//     const business = businessFiles.map(f => {
//       const s = bizDocState[f.acc_media_id]?.status || "";
//       const r = bizDocState[f.acc_media_id]?.reason || "";
//       return makeEntry(f, s, r);
//     }).filter(Boolean) as UpdateVendorAccountProfilePayload['file_state'];

//     return [...owner, ...business];
//   }

//   // ====== submit ======
//   const [collapsed, setCollapsed] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

//   async function handleSubmitUpdate() {
//     setSubmitError(null);
//     setSubmitSuccess(null);
//     setSubmitLoading(true);
//     try {
//       const staffId = getStaffIdFromStorage();

//       //"612dd1f0-8cd5-41f5-8b82-17cd40144e52"; // or getStaffIdFromStorage();
//       const stateNameTitle = toTitleCase(accountStatus);
//       const payload: UpdateVendorAccountProfilePayload = {
//         staff_id: staffId || '',
//         account: {
//           acc_id: account?.acc_id || '',
//           email: account?.email || null,
//           phone: account?.phone || null,
//           account_type: account?.account_type || null,
//           firstName: (account as any)?.firstName || (account as any)?.first_name || null,
//           lastName: (account as any)?.lastName || (account as any)?.last_name || null,
//         },
//         vendor: vendor?.vend_id ? { vend_id: vendor!.vend_id } : undefined,
//         vendor_state: {
//           note: 'NON',
//           reason: getAccountStatusMessage(accountStatus),
//           state_code: '',
//           state_name: stateNameTitle,
//         },
//         file_state: buildFileState(),
//         account_state: {
//           note: 'NA',
//           reason: getAccountStatusMessage(accountStatus),
//           state_code: '',
//           state_name: stateNameTitle,
//         },
//       };

//       const res = await updateVendorAccountProfile(payload);
//       try { console.log('[AccountOwner] update-vendor-account-profile success', res); } catch { }
//       setSubmitSuccess('Saved');
//     } catch (e: any) {
//       try { console.error('[AccountOwner] update-vendor-account-profile error', e); } catch { }
//       setSubmitError(e?.message || 'Failed to save');
//     } finally {
//       setSubmitLoading(false);
//     }
//   }

//   const handleToggleSidebar = () => {
//     if (window.innerWidth < 768) setIsSidebarOpen((prev) => !prev);
//     else setCollapsed((prev) => !prev);
//   };
//   const handleViewClick = () => { navigate('/dealer-management'); };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar
//         collapsed={collapsed}
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//       />
//       {/* Navbar */}
//       <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title="Dealer Management" />

//       {/* Main */}
//       <main className={`p-6 mt-10 transition-all duration-300 ${collapsed ? "md:ml-20" : "md:ml-64"}`}>
//         <div className="mt-4 flex items-center justify-between">
//           <button onClick={handleViewClick}
//             className="px-3 py-2 font-semibold text-sm text-black bg-white border rounded">Back</button>
//           <select
//             className="px-3 py-2 text-sm text-[#028174] border rounded border-[#028174] bg-white cursor-pointer focus:outline-none"
//             value={accountStatus}
//             onChange={(e) => {
//               const v = e.target.value;
//               setAccountStatus(v);
//               const msg = getAccountStatusMessage(v);
//               setAccountStatusReasonMsg(msg);
//               try { console.log('[AccountOwner] account_state', { state_name: v, state_code: 'ACC', reason: msg }); } catch { }
//             }}
//           >
//             <option value="">Change account status</option>
//             <option value="approved">Approved</option>
//             <option value="pending">Pending</option>
//             <option value="rejected">Rejected</option>
//             <option value="amendment">Amendment</option>
//           </select>
//         </div>

//         <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-3">
//           {/* Account owner details */}
//           <div className="border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
//             <h2 className="text-md text-black font-semibold">Account Owner Details</h2>
//             <div className="flex items-center gap-3 mt-3">
//               <img src={johnsmith} alt="john smith" className="w-10 h-10" />
//               <div className="flex-col items-center">
//                 <h3 className="text-sm text-black font-semibold">
//                   {[(account as any)?.firstName || (account as any)?.first_name || '', (account as any)?.lastName || (account as any)?.last_name || ''].filter(Boolean).join(' ') || '—'}
//                 </h3>
//                 <h3 className="text-sm text-gray-700">Account ID: {account?.acc_id || '—'}</h3>
//                 <button className="px-3 py-2 text-sm font-semibold text-[#028174] bg-[#CAFFDC] border rounded">
//                   {latestAccountState?.state_name || '—'}
//                 </button>
//               </div>
//             </div>

//             <div className="mt-3 grid grid-cols-1 md:grid-cols-2 justify-between">
//               <div className="grid-cols-1 md:grid-cols-2 ">
//                 <div className="flex flex-col justify-between ">
//                   <h3 className="text-sm text-gray-700">Contact Person</h3>
//                   <h3 className="text-sm text-black">
//                     {[(account as any)?.firstName || (account as any)?.first_name || '', (account as any)?.lastName || (account as any)?.last_name || ''].filter(Boolean).join(' ') || '—'}
//                   </h3>

//                   <h3 className="text-sm text-gray-700 mt-3">Phone</h3>
//                   <h3 className="text-sm text-black">{account?.phone || '—'}</h3>

//                   <h3 className="text-sm text-gray-700 mt-3">Registration Date</h3>
//                   <h3 className="text-sm text-black">{(account?.created_at || '').split('T')[0] || '—'}</h3>

//                   <h3 className="text-sm text-gray-700 mt-3">Account Type</h3>
//                   <h3 className="text-sm text-black">{account?.account_type || '—'}</h3>
//                 </div>
//               </div>
//               <div className="flex flex-col justify-start">
//                 <h3 className="text-sm text-gray-700">Email</h3>
//                 <h3 className="text-sm text-black">{account?.email || '—'}</h3>

//                 <h3 className="text-sm text-gray-700 mt-3">Subscription Plan</h3>
//                 <h3 className="text-sm text-black">{membership?.type || '—'} {membership?.status ? `(${membership.status})` : ''}</h3>

//                 <h3 className="text-sm text-gray-700 mt-3">Last Active</h3>
//                 <h3 className="text-sm text-black">{latestSession?.last_accessed || latestSession?.start_time || '—'}</h3>
//               </div>
//             </div>
//           </div>

//           {/* Activity metrics */}
//           <div className="border rounded p-2 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
//             <h2 className="text-md text-black font-semibold">Activity Metrics</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//               <MetricStatCard 
//                 title="Requests Received" 
//                 value={vendor?.sub_statistic?.request_part_count?.toString() || "0"} 
//                 deltaText="+12 in last 30 days" 
//               />
//               <MetricStatCard 
//                 title="Match Rate" 
//                 value={vendor?.sub_statistic?.total_match ? `${vendor.sub_statistic.total_match}%` : "0%"} 
//                 deltaText="+5% from last month" 
//               />
//               <MetricStatCard 
//                 title="Contact Rate" 
//                 value={vendor?.sub_statistic?.contact_rate ? `${vendor.sub_statistic.contact_rate}%` : "0%"} 
//                 deltaText="-3% from last month" 
//                 deltaClassName="text-[#CA8A04]" 
//               />
//               <MetricStatCard 
//                 title="Chats/Calls Initiated" 
//                 value={vendor?.sub_statistic?.chat_call_count?.toString() || "0"} 
//                 deltaText="+8 in last 30 days" 
//               />
//               <MetricStatCard 
//                 title="Login Frequency" 
//                 value={vendor?.sub_statistic?.login?.toString() || "0"} 
//                 deltaText="Stable" 
//               />
//               <MetricStatCard 
//                 title="Last Active" 
//                 value={formatLastActive(vendor?.sub_statistic?.last_active)} 
//                 deltaText="2 hours ago" 
//                 deltaClassName="text-[#3E38DA]" 
//               />
//             </div>
//           </div>
//         </div>

//         {/* Account Owner Documents */}
//         {vendor ? (
//           <div className="w-full mt-4 border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
//             <h3 className="text-sm text-black font-semibold mb-4">Bussiness Owner Documents</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <DocumentCard
//                 iconSrc={pdf}
//                 title="Driving Licence Front"
//                 subText={dlFront ? `Exp: ${formatYMD(dlFront.expiry_date)}` : "Not uploaded"}
//                 onView={dlFront ? () => window.open(dlFront.file_path, '_blank') : undefined}
//                 statusValue={dlFrontStatus}
//                 onStatusChange={(v) => { setDlFrontStatus(v); setDlFrontReason(v?.toLowerCase() === 'rejected' ? dlFrontReason : ""); }}
//                 reasonValue={dlFrontReason}
//                 onReasonChange={setDlFrontReason}
//               />
//               <DocumentCard
//                 iconSrc={pdf}
//                 title="Driving Licence Back"
//                 subText={dlBack ? `Exp: ${formatYMD(dlBack.expiry_date)}` : "Not uploaded"}
//                 onView={dlBack ? () => window.open(dlBack.file_path, '_blank') : undefined}
//                 statusValue={dlBackStatus}
//                 onStatusChange={(v) => { setDlBackStatus(v); setDlBackReason(v?.toLowerCase() === 'rejected' ? dlBackReason : ""); }}
//                 reasonValue={dlBackReason}
//                 onReasonChange={setDlBackReason}
//               />
//               <DocumentCard
//                 iconSrc={pdf}
//                 title="Passport"
//                 subText={passportDoc ? `Exp: ${formatYMD(passportDoc.expiry_date)}` : "Not uploaded"}
//                 onView={passportDoc ? () => window.open(passportDoc.file_path, '_blank') : undefined}
//                 statusValue={passportStatus}
//                 onStatusChange={(v) => { setPassportStatus(v); setPassportReason(v?.toLowerCase() === 'rejected' ? passportReason : ""); }}
//                 reasonValue={passportReason}
//                 onReasonChange={setPassportReason}
//               />
//             </div>
//           </div>
//         ) : null}

//         {/* Business Details */}
//         {vendor ? (
//           <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
//             <div className="border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
//               <h2 className="text-md text-black font-semibold">Business Details</h2>
//               <div className="flex items-center gap-3 mt-3">
//                 <img src={johnsmith} alt="john smith" className="w-10 h-10" />
//                 <div className="flex-col items-center">
//                   <h3 className="text-sm text-black font-semibold">{vendor?.business_name || '—'}</h3>
//                   <h3 className="text-sm text-gray-700">{vendor?.official_email || '—'}</h3>
//                   <button className="px-3 py-2 text-sm font-semibold text-[#3E38DA] bg-[#DBEAFE] border rounded">{membership?.type || '—'}</button>
//                 </div>
//               </div>

//               <div className="mt-3 grid grid-cols-1 md:grid-cols-2 justify-between">
//                 <div className="grid-cols-1 md:grid-cols-2 ">
//                   <div className="flex flex-col justify-between ">
//                     <h3 className="text-sm text-gray-700">Bussiness Name:</h3>
//                     <h3 className="text-sm text-black">{vendor?.business_name || '—'}</h3>

//                     <h3 className="text-sm text-gray-700 mt-3">Garage Location:</h3>
//                     <h3 className="text-sm text-black">{vendor?.address || vendor?.location || '—'}</h3>

//                     <h3 className="text-sm text-gray-700 mt-3">Email Address:</h3>
//                     <h3 className="text-sm text-black">{vendor?.official_email || '—'}</h3>
//                   </div>
//                 </div>
//                 <div className="flex flex-col justify-start">
//                   <h3 className="text-sm text-gray-700">Country & Location:</h3>
//                   <h3 className="text-sm text-black">{vendor?.country || vendor?.location || '—'}</h3>

//                   <h3 className="text-sm text-gray-700 mt-3">Phone Number:</h3>
//                   <h3 className="text-sm text-black">{vendor?.official_phone || '—'}</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : null}

//         {/* Business Documents (per-file) */}
//         {vendor ? (
//           <div className="w-full border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md ">
//             <h3 className="text-sm text-black font-semibold mb-4">Business Documents</h3>

//             {businessFiles.length === 0 ? (
//               <div className="text-sm text-gray-600">No business documents detected.</div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {businessFiles.map((f) => {
//                   const label = businessKindLabel(f);
//                   const state = bizDocState[f.acc_media_id] || { status: "", reason: "" };
//                   return (
//                     <DocumentCard
//                       key={f.acc_media_id}
//                       iconSrc={pdf}
//                       title={label}  // ✅ only the clean label (no id, no filename)
//                       subText={`Exp: ${formatYMD(f.expiry_date)}`}
//                       onView={() => window.open(f.file_path, '_blank')}
//                       statusValue={state.status}
//                       onStatusChange={(v) => {
//                         setBizDocState(prev => {
//                           const next = { ...prev };
//                           const existing = next[f.acc_media_id] || { status: "", reason: "" };
//                           next[f.acc_media_id] = {
//                             status: v,
//                             reason: (v?.toLowerCase() === 'rejected') ? existing.reason : "",
//                           };
//                           return next;
//                         });
//                       }}
//                       reasonValue={state.reason}
//                       onReasonChange={(val) => {
//                         setBizDocState(prev => {
//                           const next = { ...prev };
//                           const existing = next[f.acc_media_id] || { status: "", reason: "" };
//                           next[f.acc_media_id] = { ...existing, reason: val };
//                           return next;
//                         });
//                       }}
//                     />
//                   );
//                 })}
//               </div>
//             )}

//             {submitError ? (
//               <div className="mt-2 text-sm text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2">{submitError}</div>
//             ) : null}
//             {submitSuccess ? (
//               <div className="mt-2 text-sm text-emerald-900 bg-emerald-100 border border-emerald-200 rounded px-3 py-2">{submitSuccess}</div>
//             ) : null}
//             <div className="flex justify-end">
//               <button onClick={handleSubmitUpdate} disabled={submitLoading} className="text-sm mt-2 px-4 py-2 text-white bg-[#028174] border rounded disabled:opacity-60 disabled:cursor-not-allowed">
//                 {submitLoading ? 'Saving...' : 'Submit'}
//               </button>
//             </div>
//           </div>
//         ) : null}
//       </main>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../../components/CommonNavbar';

import johnsmith from "../../../assets/images/John Smith.png";
import pdf from "../../../assets/images/pdf.png";
import MetricStatCard from "./component/MetricStatCard";
import type { Account, Vendor, Membership, Session, AccountState, MediaFile } from "../../../services/dealerManagementService";
import { updateVendorAccountProfile, type UpdateVendorAccountProfilePayload } from "../../../services/dealerManagementService";
import DocumentCard from "./component/DocumentCard";

function getStaffIdFromStorage(): string | undefined {
  try {
    const raw = localStorage.getItem('staffAuth');
    if (!raw) return undefined;
    const obj = JSON.parse(raw);
    return obj?.data?.staff?.staff_id;
  } catch {
    return undefined;
  }
}

export default function AccountOwner() {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location as any)?.state as { account?: Account } | undefined;
  const account = navState?.account;
  const vendor: Vendor | undefined = Array.isArray(account?.vendor) && account!.vendor!.length > 0 ? account!.vendor![0] : undefined;
  const membership: Membership | undefined = Array.isArray(account?.memberships) && account!.memberships!.length > 0 ? account!.memberships![0] : undefined;
  const latestSession: Session | undefined = Array.isArray(account?.session) && account!.session!.length > 0 ? account!.session![0] : undefined;
  const latestAccountState: AccountState | undefined = Array.isArray(account?.account_states) && account!.account_states!.length > 0 ? account!.account_states!.slice(-1)[0] : undefined;

  const [accountStatus, setAccountStatus] = useState<string>((latestAccountState?.state_name || '').toLowerCase());
  const [accountStatusReasonMsg, setAccountStatusReasonMsg] = useState<string>(""); void accountStatusReasonMsg;

  function getAccountStatusMessage(status: string): string {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'approved': return 'Your Profile Is Approved';
      case 'pending': return 'Your Profile Is Under Review.';
      case 'rejected': return 'Your Profile has been Rejected';
      case 'amendment': return 'Your Profile Need Amendment';
      default: return 'Under Review';
    }
  }

  useEffect(() => {
    const current = (latestAccountState?.state_name || '').toLowerCase();
    setAccountStatus(current);
    setAccountStatusReasonMsg(getAccountStatusMessage(current));
    try { console.log('[AccountOwner] account_state:init', { state_name: current, state_code: 'ACC', reason: getAccountStatusMessage(current) }); } catch { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestAccountState?.state_name]);

  // ====== Helpers ======
  function allFiles(): MediaFile[] {
    return Array.isArray(vendor?.media_files) ? vendor!.media_files! : [];
  }
  function findMediaByPrefix(prefixes: string[]): MediaFile | undefined {
    const files = allFiles();
    const lowerPrefixes = prefixes.map(p => p.toLowerCase());
    return files.find((f) => {
      const name = (f.file_name || '').toLowerCase();
      return lowerPrefixes.some(p => name.startsWith(p));
    });
  }
  function findMediaByIncludes(parts: string[]): MediaFile | undefined {
    const files = allFiles();
    const lowerParts = parts.map(p => p.toLowerCase());
    return files.find((f) => {
      const name = (f.file_name || '').toLowerCase();
      return lowerParts.every(p => name.includes(p));
    });
  }
  function findMediaByAnyPattern(patternSets: string[][]): MediaFile | undefined {
    for (const parts of patternSets) {
      const found = findMediaByIncludes(parts);
      if (found) return found;
    }
    return undefined;
  }

  // ====== Account Owner Documents (same) ======
  const dlFront = findMediaByPrefix(["em_front", "em front", "em-front"]);
  const dlBack = findMediaByPrefix(["em_back", "em back", "em-back"]);
  const passportDoc = findMediaByPrefix(["passport_0", "passport", "pp_", "pp-"]);

  // ====== Business Documents detection
  const isTrade = (f: MediaFile) => {
    const name = (f.file_name || '').toLowerCase();
    return (
      name.startsWith('trad_') ||
      (name.includes('trade') && (name.includes('licen') || name.includes('license') || name.includes('licence'))) ||
      name === 'tl' || name.startsWith('tl')
    );
  };
  const isTax = (f: MediaFile) => {
    const name = (f.file_name || '').toLowerCase();
    return (
      name.startsWith('tax_') ||
      name === 'tax' ||
      name.includes(' tax') ||
      name.includes('tax ') ||
      name.includes('trn') ||
      name.includes('vat') ||
      (name.includes('tax') && (name.includes('reg') || name.includes('registration')))
    );
  };
  const isPOA = (f: MediaFile) => {
    const name = (f.file_name || '').toLowerCase();
    return (
      name.startsWith('proof_') ||
      (name.includes('proof') && name.includes('address')) ||
      name.includes('poa') ||
      (name.includes('address') && name.includes('proof'))
    );
  };

  // Legacy singles (keep them so nothing disappears)
  const tradeLicenseSingle = findMediaByAnyPattern([
    ["trad_"], ["trade", "licen"], ["trade", "license"], ["trade", "licence"], ["tl"]
  ]);
  const taxRegistrationSingle =
    findMediaByPrefix(["tax_", "tax", "trn", "vat"]) ||
    findMediaByIncludes(["tax"]) ||
    findMediaByAnyPattern([["tax", "reg"], ["tax", "registration"], ["trn"]]);
  const proofOfAddressSingle = findMediaByAnyPattern([
    ["proof_"], ["proof", "address"], ["poa"], ["address", "proof"]
  ]);

  // Collect ALL business docs + seed with singles; de-dupe by acc_media_id
  const businessFiles = useMemo(() => {
    const files = allFiles();
    const matched = files.filter(f => isTrade(f) || isTax(f) || isPOA(f));

    if (tradeLicenseSingle) matched.push(tradeLicenseSingle);
    if (taxRegistrationSingle) matched.push(taxRegistrationSingle);
    if (proofOfAddressSingle) matched.push(proofOfAddressSingle);

    const byId = new Map<string, MediaFile>();
    for (const f of matched) {
      if (f?.acc_media_id) byId.set(f.acc_media_id, f);
    }
    const out = Array.from(byId.values());
    out.sort((a, b) => (a.file_name || '').localeCompare(b.file_name || ''));
    return out;
  }, [vendor?.media_files, tradeLicenseSingle, taxRegistrationSingle, proofOfAddressSingle]);

  function businessKindLabel(f: MediaFile): 'Trade Licence' | 'Tax Registration' | 'Proof of Address' | 'Business Document' {
    if (isTrade(f)) return 'Trade Licence';
    if (isTax(f)) return 'Tax Registration';
    if (isPOA(f)) return 'Proof of Address';
    return 'Business Document';
  }

  // ====== Owner doc per-card state (unchanged) ======
  const [dlFrontStatus, setDlFrontStatus] = useState("");
  const [dlFrontReason, setDlFrontReason] = useState("");
  const [dlBackStatus, setDlBackStatus] = useState("");
  const [dlBackReason, setDlBackReason] = useState("");
  const [passportStatus, setPassportStatus] = useState("");
  const [passportReason, setPassportReason] = useState("");

  // ====== Business docs per-file state (status + reason each) ======
  type PerFileState = Record<string, { status: string; reason: string }>;
  const [bizDocState, setBizDocState] = useState<PerFileState>({});

  // Ensure state entries for visible files; drop stale ones
  useEffect(() => {
    setBizDocState(prev => {
      const next: PerFileState = { ...prev };
      for (const f of businessFiles) {
        if (!next[f.acc_media_id]) next[f.acc_media_id] = { status: "", reason: "" };
      }
      for (const k of Object.keys(next)) {
        if (!businessFiles.some(f => f.acc_media_id === k)) delete next[k];
      }
      return next;
    });
  }, [businessFiles]);

  // ====== format helpers ======
  function toTitleCase(value: string): string {
    const s = (value || '').trim();
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }

  function formatYMD(value?: string | null): string {
    if (!value) return '—';
    const match = value.match(/\d{4}-\d{2}-\d{2}/);
    if (match) return match[0];
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // === ONLY used by Activity Metrics → Last Active ===
  function formatLastActive(value?: string | null): string {
    if (!value) return '—';

    // Try native parse
    let date: Date | null = null;
    const native = new Date(value);
    if (!isNaN(native.getTime())) {
      date = native;
    }

    // Handle "YY-MM-DD HH:mm:ss" like "25-11-01 12:00:00"
    if (!date || isNaN(date.getTime())) {
      const parts = value.trim().split(/[\s-:]/); // ["25","11","01","12","00","00"]
      if (parts.length >= 3) {
        const yy = parseInt(parts[0], 10);
        const mm = parseInt(parts[1], 10);
        const dd = parseInt(parts[2], 10);
        let yyyy = yy;
        if (yy >= 0 && yy < 100) {
          // assume 20xx for < 50, else 19xx
          yyyy = yy < 50 ? 2000 + yy : 1900 + yy;
        }
        const hh = parts.length >= 4 ? parseInt(parts[3], 10) || 0 : 0;
        const min = parts.length >= 5 ? parseInt(parts[4], 10) || 0 : 0;
        const ss = parts.length >= 6 ? parseInt(parts[5], 10) || 0 : 0;
        date = new Date(yyyy, (mm || 1) - 1, dd || 1, hh, min, ss);
      }
    }

    if (!date || isNaN(date.getTime())) return '—';

    const now = new Date();

    // Normalize to midnight for "is today?"
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const valueMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const isToday = todayMidnight.getTime() === valueMidnight.getTime();

    if (isToday) {
      const diffMs = now.getTime() - date.getTime();
      if (diffMs < 0) return 'Just now';
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        if (diffMinutes <= 0) return 'Just now';
        if (diffMinutes === 1) return '1 minute ago';
        return `${diffMinutes} minutes ago`;
      }
      if (diffHours === 1) return '1 hour ago';
      return `${diffHours} hours ago`;
    }

    // Not today → show only days
    const diffDays = Math.floor(
      (todayMidnight.getTime() - valueMidnight.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  }

  // ====== live file_state preview in console ======
  useEffect(() => {
    function makeEntry(file?: MediaFile, status?: string, reason?: string) {
      if (!file || !status) return null;
      const selectedStatus = String(status).trim();
      return {
        acc_media_id: file.acc_media_id,
        note: "",
        reason: selectedStatus.toLowerCase() === 'rejected' ? (reason || "") : "",
        state_code: "DOCS",
        state_name: selectedStatus.toLowerCase(),
      };
    }

    const ownerItems = [
      makeEntry(dlFront, dlFrontStatus, dlFrontReason),
      makeEntry(dlBack, dlBackStatus, dlBackReason),
      makeEntry(passportDoc, passportStatus, passportReason),
    ].filter(Boolean);

    const businessItems = businessFiles.map(f => {
      const s = bizDocState[f.acc_media_id]?.status || "";
      const r = bizDocState[f.acc_media_id]?.reason || "";
      return makeEntry(f, s, r);
    }).filter(Boolean);

    const items = [...ownerItems, ...businessItems];
    try { console.log('[AccountOwner] file_state', { file_state: items }); } catch { }
  }, [
    // owner
    dlFrontStatus, dlFrontReason,
    dlBackStatus, dlBackReason,
    passportStatus, passportReason,
    dlFront, dlBack, passportDoc,
    // business
    bizDocState, businessFiles
  ]);

  // ====== payload builder ======
  function buildFileState(): UpdateVendorAccountProfilePayload['file_state'] {
    function makeEntry(file?: MediaFile, status?: string, reason?: string) {
      if (!file || !status) return null;
      const selectedStatus = String(status).trim().toLowerCase();
      return {
        acc_media_id: file.acc_media_id,
        note: "",
        reason: selectedStatus === 'rejected' ? (reason || "") : "",
        state_code: "DOCS",
        state_name: selectedStatus,
      };
    }

    const owner = [
      makeEntry(dlFront, dlFrontStatus, dlFrontReason),
      makeEntry(dlBack, dlBackStatus, dlBackReason),
      makeEntry(passportDoc, passportStatus, passportReason),
    ].filter(Boolean) as UpdateVendorAccountProfilePayload['file_state'];

    const business = businessFiles.map(f => {
      const s = bizDocState[f.acc_media_id]?.status || "";
      const r = bizDocState[f.acc_media_id]?.reason || "";
      return makeEntry(f, s, r);
    }).filter(Boolean) as UpdateVendorAccountProfilePayload['file_state'];

    return [...owner, ...business];
  }

  // ====== submit ======
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  async function handleSubmitUpdate() {
    setSubmitError(null);
    setSubmitSuccess(null);
    setSubmitLoading(true);
    try {
      const staffId = getStaffIdFromStorage();

      const stateNameTitle = toTitleCase(accountStatus);
      const payload: UpdateVendorAccountProfilePayload = {
        staff_id: staffId || '',
        account: {
          acc_id: account?.acc_id || '',
          email: account?.email || null,
          phone: account?.phone || null,
          account_type: account?.account_type || null,
          firstName: (account as any)?.firstName || (account as any)?.first_name || null,
          lastName: (account as any)?.lastName || (account as any)?.last_name || null,
        },
        vendor: vendor?.vend_id ? { vend_id: vendor!.vend_id } : undefined,
        vendor_state: {
          note: 'NON',
          reason: getAccountStatusMessage(accountStatus),
          state_code: '',
          state_name: stateNameTitle,
        },
        file_state: buildFileState(),
        account_state: {
          note: 'NA',
          reason: getAccountStatusMessage(accountStatus),
          state_code: '',
          state_name: stateNameTitle,
        },
      };

      const res = await updateVendorAccountProfile(payload);
      try { console.log('[AccountOwner] update-vendor-account-profile success', res); } catch { }
      setSubmitSuccess('Saved');
    } catch (e: any) {
      try { console.error('[AccountOwner] update-vendor-account-profile error', e); } catch { }
      setSubmitError(e?.message || 'Failed to save');
    } finally {
      setSubmitLoading(false);
    }
  }

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) setIsSidebarOpen((prev) => !prev);
    else setCollapsed((prev) => !prev);
  };
  const handleViewClick = () => { navigate('/dealer-management'); };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {/* Navbar */}
      <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title="Dealer Management" />

      {/* Main */}
      <main className={`p-6 mt-10 transition-all duration-300 ${collapsed ? "md:ml-20" : "md:ml-64"}`}>
        <div className="mt-4 flex items-center justify-between">
          <button onClick={handleViewClick}
            className="px-3 py-2 font-semibold text-sm text-black bg-white border rounded">Back</button>
          <select
            className="px-3 py-2 text-sm text-[#028174] border rounded border-[#028174] bg-white cursor-pointer focus:outline-none"
            value={accountStatus}
            onChange={(e) => {
              const v = e.target.value;
              setAccountStatus(v);
              const msg = getAccountStatusMessage(v);
              setAccountStatusReasonMsg(msg);
              try { console.log('[AccountOwner] account_state', { state_name: v, state_code: 'ACC', reason: msg }); } catch { }
            }}
          >
            <option value="">Change account status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="amendment">Amendment</option>
          </select>
        </div>

        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Account owner details */}
          <div className="border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-md text-black font-semibold">Account Owner Details</h2>
            <div className="flex items-center gap-3 mt-3">
              {/* Avatar with initials */}
              <div className="w-10 h-10 rounded-full bg-[#028174] flex items-center justify-center text-white font-semibold text-sm">
                {(() => {
                  const firstName = (account as any)?.firstName || (account as any)?.first_name || '';
                  const lastName = (account as any)?.lastName || (account as any)?.last_name || '';
                  const initials = `${firstName.charAt(0) || ''}${lastName.charAt(0) || ''}`.toUpperCase() || '—';
                  return initials;
                })()}
              </div>
              <div className="flex-col items-center">
                <h3 className="text-sm text-black font-semibold">
                  {[(account as any)?.firstName || (account as any)?.first_name || '', (account as any)?.lastName || (account as any)?.last_name || ''].filter(Boolean).join(' ') || '—'}
                </h3>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 justify-between">
              <div className="grid-cols-1 md:grid-cols-2 ">
                <div className="flex flex-col justify-between ">
                  <h3 className="text-sm text-gray-700">Contact Person</h3>
                  <h3 className="text-sm text-black">
                    {[(account as any)?.firstName || (account as any)?.first_name || '', (account as any)?.lastName || (account as any)?.last_name || ''].filter(Boolean).join(' ') || '—'}
                  </h3>

                  <h3 className="text-sm text-gray-700 mt-3">Phone</h3>
                  <h3 className="text-sm text-black">{account?.phone || '—'}</h3>

                  <h3 className="text-sm text-gray-700 mt-3">Registration Date</h3>
                  <h3 className="text-sm text-black">{(account?.created_at || '').split('T')[0] || '—'}</h3>

                  <h3 className="text-sm text-gray-700 mt-3">Account Type</h3>
                  <h3 className="text-sm text-black">{account?.account_type || '—'}</h3>
                </div>
              </div>
              <div className="flex flex-col justify-start">
                <h3 className="text-sm text-gray-700">Email</h3>
                <h3 className="text-sm text-black">{account?.email || '—'}</h3>

                <h3 className="text-sm text-gray-700 mt-3">Subscription Plan</h3>
                <h3 className="text-sm text-black">{membership?.type || '—'} {membership?.status ? `(${membership.status})` : ''}</h3>

                <h3 className="text-sm text-gray-700 mt-3">Last Active</h3>
                <h3 className="text-sm text-black">{latestSession?.last_accessed || latestSession?.start_time || '—'}</h3>
              </div>
            </div>
          </div>

          {/* Activity metrics */}
          <div className="border rounded p-2 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-md text-black font-semibold">Activity Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <MetricStatCard 
                title="Requests Received" 
                value={vendor?.sub_statistic?.request_part_count?.toString() || "0"} 
                deltaText="+12 in last 30 days" 
              />
              <MetricStatCard 
                title="Match Rate" 
                value={vendor?.sub_statistic?.total_match ? `${vendor.sub_statistic.total_match}%` : "0%"} 
                deltaText="+5% from last month" 
              />
              <MetricStatCard 
                title="Contact Rate" 
                value={vendor?.sub_statistic?.contact_rate ? `${vendor.sub_statistic.contact_rate}%` : "0%"} 
                deltaText="-3% from last month" 
                deltaClassName="text-[#CA8A04]" 
              />
              <MetricStatCard 
                title="Chats/Calls Initiated" 
                value={vendor?.sub_statistic?.chat_call_count?.toString() || "0"} 
                deltaText="+8 in last 30 days" 
              />
              <MetricStatCard 
                title="Login Frequency" 
                value={vendor?.sub_statistic?.login?.toString() || "0"} 
                deltaText="Stable" 
              />
              {/* >>> The only changed piece: Last Active formatting <<< */}
              <MetricStatCard 
                title="Last Active" 
                value={formatLastActive(vendor?.sub_statistic?.last_active)} 
                deltaText="‎" 
                deltaClassName="text-[#3E38DA]" 
              />
            </div>
          </div>
        </div>

        {/* Account Owner Documents */}
        {vendor ? (
          <div className="w-full mt-4 border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <h3 className="text-sm text-black font-semibold mb-4">Bussiness Owner Documents</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DocumentCard
                iconSrc={pdf}
                title="Driving Licence Front"
                subText={dlFront ? `Exp: ${formatYMD(dlFront.expiry_date)}` : "Not uploaded"}
                onView={dlFront ? () => window.open(dlFront.file_path, '_blank') : undefined}
                statusValue={dlFrontStatus}
                onStatusChange={(v) => { setDlFrontStatus(v); setDlFrontReason(v?.toLowerCase() === 'rejected' ? dlFrontReason : ""); }}
                reasonValue={dlFrontReason}
                onReasonChange={setDlFrontReason}
              />
              <DocumentCard
                iconSrc={pdf}
                title="Driving Licence Back"
                subText={dlBack ? `Exp: ${formatYMD(dlBack.expiry_date)}` : "Not uploaded"}
                onView={dlBack ? () => window.open(dlBack.file_path, '_blank') : undefined}
                statusValue={dlBackStatus}
                onStatusChange={(v) => { setDlBackStatus(v); setDlBackReason(v?.toLowerCase() === 'rejected' ? dlBackReason : ""); }}
                reasonValue={dlBackReason}
                onReasonChange={setDlBackReason}
              />
              <DocumentCard
                iconSrc={pdf}
                title="Passport"
                subText={passportDoc ? `Exp: ${formatYMD(passportDoc.expiry_date)}` : "Not uploaded"}
                onView={passportDoc ? () => window.open(passportDoc.file_path, '_blank') : undefined}
                statusValue={passportStatus}
                onStatusChange={(v) => { setPassportStatus(v); setPassportReason(v?.toLowerCase() === 'rejected' ? passportReason : ""); }}
                reasonValue={passportReason}
                onReasonChange={setPassportReason}
              />
            </div>
          </div>
        ) : null}

        {/* Business Details */}
        {vendor ? (
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
              <h2 className="text-md text-black font-semibold">Business Details</h2>
              <div className="flex items-center gap-3 mt-3">
                <img src={johnsmith} alt="john smith" className="w-10 h-10" />
                <div className="flex-col items-center">
                  <h3 className="text-sm text-black font-semibold">{vendor?.business_name || '—'}</h3>
                  <h3 className="text-sm text-gray-700">{vendor?.official_email || '—'}</h3>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 justify-between">
                <div className="grid-cols-1 md:grid-cols-2 ">
                  <div className="flex flex-col justify-between ">
                    <h3 className="text-sm text-gray-700">Bussiness Name:</h3>
                    <h3 className="text-sm text-black">{vendor?.business_name || '—'}</h3>

                    <h3 className="text-sm text-gray-700 mt-3">Garage Location:</h3>
                    <h3 className="text-sm text-black">{vendor?.address || vendor?.location || '—'}</h3>

                    <h3 className="text-sm text-gray-700 mt-3">Email Address:</h3>
                    <h3 className="text-sm text-black">{vendor?.official_email || '—'}</h3>
                  </div>
                </div>
                <div className="flex flex-col justify-start">
                  <h3 className="text-sm text-gray-700">Country & Location:</h3>
                  <h3 className="text-sm text-black">{vendor?.country || vendor?.location || '—'}</h3>

                  <h3 className="text-sm text-gray-700 mt-3">Phone Number:</h3>
                  <h3 className="text-sm text-black">{vendor?.official_phone || '—'}</h3>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Business Documents (per-file) */}
        {vendor ? (
          <div className="w-full border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md ">
            <h3 className="text-sm text-black font-semibold mb-4">Business Documents</h3>

            {businessFiles.length === 0 ? (
              <div className="text-sm text-gray-600">No business documents detected.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessFiles.map((f) => {
                  const label = businessKindLabel(f);
                  const state = bizDocState[f.acc_media_id] || { status: "", reason: "" };
                  return (
                    <DocumentCard
                      key={f.acc_media_id}
                      iconSrc={pdf}
                      title={label}
                      subText={`Exp: ${formatYMD(f.expiry_date)}`}
                      onView={() => window.open(f.file_path, '_blank')}
                      statusValue={state.status}
                      onStatusChange={(v) => {
                        setBizDocState(prev => {
                          const next = { ...prev };
                          const existing = next[f.acc_media_id] || { status: "", reason: "" };
                          next[f.acc_media_id] = {
                            status: v,
                            reason: (v?.toLowerCase() === 'rejected') ? existing.reason : "",
                          };
                          return next;
                        });
                      }}
                      reasonValue={state.reason}
                      onReasonChange={(val) => {
                        setBizDocState(prev => {
                          const next = { ...prev };
                          const existing = next[f.acc_media_id] || { status: "", reason: "" };
                          next[f.acc_media_id] = { ...existing, reason: val };
                          return next;
                        });
                      }}
                    />
                  );
                })}
              </div>
            )}

            {submitError ? (
              <div className="mt-2 text-sm text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2">{submitError}</div>
            ) : null}
            {submitSuccess ? (
              <div className="mt-2 text-sm text-emerald-900 bg-emerald-100 border border-emerald-200 rounded px-3 py-2">{submitSuccess}</div>
            ) : null}
            <div className="flex justify-end">
              <button onClick={handleSubmitUpdate} disabled={submitLoading} className="text-sm mt-2 px-4 py-2 text-white bg-[#028174] border rounded disabled:opacity-60 disabled:cursor-not-allowed">
                {submitLoading ? 'Saving...' : 'Submit'}
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
