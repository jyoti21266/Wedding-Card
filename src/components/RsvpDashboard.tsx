import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  CheckCircle2, 
  XCircle,
  FileSpreadsheet
} from 'lucide-react';
import { RsvpEntry, Language } from '../types/invitation';

interface RsvpDashboardProps {
  rsvpList: RsvpEntry[];
  language: Language;
}

export const RsvpDashboard: React.FC<RsvpDashboardProps> = ({
  rsvpList,
  language
}) => {
  const [filter, setFilter] = useState<'all' | 'attending' | 'declined'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const totalResponses = rsvpList.length;
  const attendingCount = rsvpList.filter((r) => r.status === 'attending').length;
  const declinedCount = rsvpList.filter((r) => r.status === 'declined').length;
  const totalHeadcount = rsvpList
    .filter((r) => r.status === 'attending')
    .reduce((sum, r) => sum + r.guestCount, 0);

  const filteredList = rsvpList.filter((entry) => {
    const matchesFilter = filter === 'all' || entry.status === filter;
    const matchesSearch =
      entry.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.dietaryNote && entry.dietaryNote.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const exportCsv = () => {
    const headers = ['Full Name', 'Status', 'Guest Count', 'Dietary Notes', 'Blessing Message', 'Submitted At'];
    const rows = rsvpList.map((r) => [
      `"${r.fullName}"`,
      r.status,
      r.guestCount,
      `"${r.dietaryNote || ''}"`,
      `"${r.blessingMessage || ''}"`,
      r.submittedAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `invitely_rsvp_list_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span>RSVP Console</span>
            <span aria-hidden="true">·</span>
            <span>{language === 'hi' ? 'उपस्थिति ट्रैकर' : 'Guest Attendance Tracker'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
            {language === 'hi' ? 'अतिथि उपस्थिति सूची' : 'Live Guestbook & RSVPs'}
          </h2>
        </div>

        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-stone-800 bg-white hover:bg-stone-50 border border-stone-200 shadow-xs transition-colors self-start sm:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
          <span>{language === 'hi' ? 'सीएसवी डाउनलोड (Excel)' : 'Export CSV (Excel)'}</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 block mb-1">
            {language === 'hi' ? 'कुल प्रतिक्रियाएं' : 'Total Responses'}
          </span>
          <span className="text-2xl font-semibold font-mono tabular-nums text-stone-900">
            {totalResponses}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-emerald-700 block mb-1">
            {language === 'hi' ? 'उपस्थित होने वाले कुल अतिथि' : 'Confirmed Guests (Heads)'}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold font-mono tabular-nums text-emerald-700">
              {totalHeadcount}
            </span>
            <span className="text-xs text-stone-500">
              ({attendingCount} {language === 'hi' ? 'समूह' : 'groups'})
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 block mb-1">
            {language === 'hi' ? 'अनुपस्थित' : 'Regrets / Declined'}
          </span>
          <span className="text-2xl font-semibold font-mono tabular-nums text-stone-600">
            {declinedCount}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 block mb-1">
            {language === 'hi' ? 'स्वीकृति दर' : 'Acceptance Rate'}
          </span>
          <span className="text-2xl font-semibold font-mono tabular-nums text-stone-900">
            {totalResponses > 0 ? Math.round((attendingCount / totalResponses) * 100) : 0}%
          </span>
        </div>
      </div>

      {/* Controls Bar: Filter segmented control + Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-xs">
        {/* Segmented Filter */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'hi' ? 'सभी' : 'All'} ({rsvpList.length})
          </button>
          <button
            onClick={() => setFilter('attending')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'attending' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'hi' ? 'उपस्थित' : 'Attending'} ({attendingCount})
          </button>
          <button
            onClick={() => setFilter('declined')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'declined' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'hi' ? 'अनुपस्थित' : 'Declined'} ({declinedCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder={language === 'hi' ? 'नाम या टिप्पणी खोजें...' : 'Search by name...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 font-sans"
          />
        </div>
      </div>

      {/* Guest Table */}
      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-500 font-medium">
              <th className="py-3 px-4">{language === 'hi' ? 'अतिथि का नाम' : 'Guest Name'}</th>
              <th className="py-3 px-4">{language === 'hi' ? 'स्थिति' : 'Status'}</th>
              <th className="py-3 px-4 text-center">{language === 'hi' ? 'संख्या' : 'Headcount'}</th>
              <th className="py-3 px-4">{language === 'hi' ? 'आहार / विशेष नोट' : 'Dietary Note'}</th>
              <th className="py-3 px-4">{language === 'hi' ? 'शुभकामना संदेश' : 'Wishes Message'}</th>
              <th className="py-3 px-4 text-right">{language === 'hi' ? 'समय' : 'Timestamp'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-stone-400 italic">
                  {language === 'hi' ? 'कोई मेल खाता अतिथि नहीं मिला।' : 'No matching guests found.'}
                </td>
              </tr>
            ) : (
              filteredList.map((entry) => (
                <tr key={entry.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3 px-4 font-serif font-medium text-stone-900 text-sm">
                    {entry.fullName}
                  </td>
                  <td className="py-3 px-4">
                    {entry.status === 'attending' ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {language === 'hi' ? 'उपस्थित' : 'Attending'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
                        <XCircle className="w-3.5 h-3.5 text-stone-400" />
                        {language === 'hi' ? 'अनुपस्थित' : 'Declined'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-semibold tabular-nums text-stone-800">
                    {entry.status === 'attending' ? entry.guestCount : '—'}
                  </td>
                  <td className="py-3 px-4 text-stone-600 italic">
                    {entry.dietaryNote || '—'}
                  </td>
                  <td className="py-3 px-4 text-stone-700 max-w-xs truncate" title={entry.blessingMessage}>
                    {entry.blessingMessage || '—'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[11px] text-stone-400 tabular-nums">
                    {entry.submittedAt}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
