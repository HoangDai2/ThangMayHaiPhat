"use client";
import { useState, useEffect } from 'react';
import { Mail, Search, CheckCircle2, Trash2, Loader2, Eye, X, Phone, Calendar, User, Clock, MessageSquare, Calculator, Sparkles, Filter } from 'lucide-react';
import api from '../../lib/api';

interface DbContact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<DbContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'quote' | 'survey'>('all');
  const [selectedContact, setSelectedContact] = useState<DbContact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/contacts?sort_by=created_at&sort_dir=desc');
      setContacts(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa yêu cầu này?')) return;
    try {
      await api.delete(`/contacts/${id}`);
      await fetchContacts();
    } catch (e) {
      console.error(e);
      alert('Xóa thất bại');
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/contacts/${id}`, { status: 'read' });
      await fetchContacts();
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...selectedContact, status: 'read' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isQuote = (service: string | null) => {
    return (service || '').toLowerCase().includes('báo giá nhanh');
  };

  const filtered = contacts.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchSearch = 
      c.name.toLowerCase().includes(term) || 
      c.phone.toLowerCase().includes(term) ||
      (c.email && c.email.toLowerCase().includes(term)) ||
      (c.service && c.service.toLowerCase().includes(term)) ||
      (c.message && c.message.toLowerCase().includes(term));
    
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;

    const matchCategory = 
      categoryFilter === 'all' || 
      (categoryFilter === 'quote' && isQuote(c.service)) ||
      (categoryFilter === 'survey' && !isQuote(c.service));

    return matchSearch && matchStatus && matchCategory;
  });

  const countQuotes = contacts.filter(c => isQuote(c.service)).length;
  const countSurveys = contacts.filter(c => !isQuote(c.service)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#285c9a] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              SYS.LEADS // INBOX
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-1">Yêu Cầu Tư Vấn & Báo Giá</h1>
          <p className="text-slate-500 text-xs mt-0.5 font-medium">
            Quản lý thông tin liên hệ từ khách hàng gửi qua form website (Tổng cộng {contacts.length} yêu cầu)
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          {(['all', 'new', 'read'] as const).map((tab) => {
            const count = tab === 'all' 
              ? contacts.length 
              : contacts.filter(c => c.status === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  statusFilter === tab 
                    ? 'bg-[#285c9a] text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab === 'all' ? 'Tất cả' : tab === 'new' ? 'Chưa đọc' : 'Đã đọc'}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  statusFilter === tab ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-4">
        {/* Source Category Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Tất cả nguồn</span>
            <span className="text-[10px] font-mono text-slate-400">({contacts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setCategoryFilter('quote')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              categoryFilter === 'quote'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-indigo-700 hover:bg-indigo-50'
            }`}
          >
            <Calculator size={13} />
            <span>Báo giá nhanh</span>
            <span className={`text-[10px] font-mono px-1 rounded-full ${categoryFilter === 'quote' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
              {countQuotes}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setCategoryFilter('survey')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              categoryFilter === 'survey'
                ? 'bg-[#285c9a] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <span>Tư vấn khảo sát</span>
            <span className={`text-[10px] font-mono px-1 rounded-full ${categoryFilter === 'survey' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
              {countSurveys}
            </span>
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm theo tên khách, SĐT, loại thang, dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#285c9a] focus:border-transparent outline-none text-xs font-medium transition-all"
          />
        </div>
      </div>

      {/* Telemetry Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
          <span className="text-xs font-mono text-slate-400">SYS.FETCH // LOADING CONTACTS</span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-mono text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Khách Hàng</th>
                  <th className="px-5 py-3.5">Số Điện Thoại / Email</th>
                  <th className="px-5 py-3.5">Dịch Vụ Quan Tâm</th>
                  <th className="px-5 py-3.5">Thời Gian Gửi</th>
                  <th className="px-5 py-3.5 text-center">Trạng Thái</th>
                  <th className="px-5 py-3.5 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 text-sm">{contact.name}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-mono font-bold text-slate-800 text-xs">{contact.phone}</div>
                      {contact.email && <div className="text-slate-400 text-[11px] font-mono mt-0.5">{contact.email}</div>}
                    </td>
                    <td className="px-5 py-4">
                      {isQuote(contact.service) ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[11px] border border-indigo-200 shadow-2xs">
                          <Calculator className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>{contact.service}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-[#285c9a] font-bold text-[11px] border border-blue-100">
                          {contact.service || 'Tư vấn lắp đặt'}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-mono text-xs">
                      <div>{new Date(contact.created_at).toLocaleDateString('vi-VN')}</div>
                      <div className="text-[11px] text-slate-400">
                        {new Date(contact.created_at).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      {contact.status === 'new' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          Chưa xử lý
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Đã liên hệ
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="p-1.5 text-slate-500 hover:text-[#285c9a] hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {contact.status === 'new' && (
                          <button
                            onClick={() => markAsRead(contact.id)}
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-200"
                            title="Đánh dấu đã đọc"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
                          title="Xóa yêu cầu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      <Mail className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                      <p className="font-mono text-xs">KHÔNG CÓ YÊU CẦU NÀO KHỚP VỚI BỘ LỌC</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Xem Chi Tiết */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg border ${
                  isQuote(selectedContact.service)
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-blue-50 text-[#285c9a] border-blue-100'
                }`}>
                  {isQuote(selectedContact.service) ? <Calculator className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {isQuote(selectedContact.service) ? 'Chi Tiết Đơn Báo Giá Nhanh' : 'Chi Tiết Yêu Cầu Khách Hàng'}
                  </h3>
                  <span className="font-mono text-[10px] text-slate-400">ID: #{selectedContact.id.slice(0, 8)}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Khách Hàng</span>
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedContact.name}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Số Điện Thoại</span>
                  <a href={`tel:${selectedContact.phone}`} className="font-mono font-bold text-[#285c9a] text-sm flex items-center gap-1.5 hover:underline">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedContact.phone}</span>
                  </a>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Email</span>
                  <div className="font-mono text-slate-700 truncate">
                    {selectedContact.email || 'Không cung cấp'}
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Thời Gian Tiếp Nhận</span>
                  <div className="font-mono text-slate-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{new Date(selectedContact.created_at).toLocaleString('vi-VN')}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">Dịch Vụ Quan Tâm</span>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs border ${
                  isQuote(selectedContact.service)
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-blue-50 text-[#285c9a] border-blue-100'
                }`}>
                  {isQuote(selectedContact.service) && <Calculator className="w-3.5 h-3.5 text-indigo-600" />}
                  <span>{selectedContact.service || 'Tư vấn lắp đặt thang máy'}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-slate-400" />
                  {isQuote(selectedContact.service) ? 'Cấu Hình & Dự Toán Báo Giá' : 'Nội Dung Tin Nhắn'}
                </span>
                <div className={`rounded-xl p-4 text-xs leading-relaxed border whitespace-pre-wrap font-mono ${
                  isQuote(selectedContact.service)
                    ? 'bg-slate-900 text-slate-100 border-slate-800'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  {selectedContact.message || 'Khách hàng không để lại ghi chú chi tiết.'}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-slate-50 border-t border-slate-200">
              <a
                href={`tel:${selectedContact.phone}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Gọi ngay</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="px-4 py-2 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Đóng
                </button>
                {selectedContact.status === 'new' && (
                  <button
                    onClick={() => markAsRead(selectedContact.id)}
                    className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#285c9a] hover:bg-[#1e4a80] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đánh dấu đã đọc
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
