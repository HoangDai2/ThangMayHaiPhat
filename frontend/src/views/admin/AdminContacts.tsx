"use client";
import { useState, useEffect } from 'react';
import { Mail, Search, CheckCircle2, Trash2, Loader2, Eye, X } from 'lucide-react';
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

  const filtered = contacts.filter((c) => {
    const matchSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Yêu Cầu Tư Vấn</h1>
          <p className="text-slate-500 text-sm mt-0.5">Tổng cộng {contacts.length} yêu cầu từ khách hàng</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-slate-200/80 shadow-sm">
          {(['all', 'new', 'read'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === tab 
                  ? 'bg-slate-100 text-[#285c9a] shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab === 'all' ? 'Tất cả' : tab === 'new' ? 'Chưa đọc' : 'Đã đọc'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm theo tên, SĐT, Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#285c9a] focus:border-transparent outline-none text-sm transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Khách hàng</th>
                  <th className="px-6 py-4 font-medium">Liên hệ</th>
                  <th className="px-6 py-4 font-medium">Dịch vụ quan tâm</th>
                  <th className="px-6 py-4 font-medium">Thời gian</th>
                  <th className="px-6 py-4 font-medium text-center">Trạng thái</th>
                  <th className="px-6 py-4 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{contact.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600">{contact.phone}</div>
                      {contact.email && <div className="text-slate-400 text-xs mt-0.5">{contact.email}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-[#285c9a] font-medium text-xs">
                        {contact.service || 'Chưa xác định'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(contact.created_at).toLocaleDateString('vi-VN')}
                      <div className="text-xs text-slate-400">
                        {new Date(contact.created_at).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {contact.status === 'new' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-medium border border-amber-200/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          Mới
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium border border-emerald-200/50">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đã đọc
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="p-2 text-slate-400 hover:text-[#285c9a] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {contact.status === 'new' && (
                          <button
                            onClick={() => markAsRead(contact.id)}
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Đánh dấu đã đọc"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      Không tìm thấy yêu cầu tư vấn nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Xem chi tiết */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800 text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#285c9a]" />
                Chi tiết yêu cầu
              </h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Khách hàng</div>
                  <div className="font-medium text-slate-800">{selectedContact.name}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Số điện thoại</div>
                  <div className="font-medium text-slate-800">{selectedContact.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Email</div>
                  <div className="font-medium text-slate-800">{selectedContact.email || 'Không có'}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Thời gian gửi</div>
                  <div className="font-medium text-slate-800">
                    {new Date(selectedContact.created_at).toLocaleString('vi-VN')}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 mb-1">Dịch vụ quan tâm</div>
                <div className="inline-flex px-3 py-1.5 rounded-lg bg-blue-50 text-[#285c9a] font-medium text-sm">
                  {selectedContact.service || 'Chưa xác định'}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 mb-2">Nội dung tin nhắn</div>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selectedContact.message || 'Không có nội dung tin nhắn.'}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-5 py-2.5 rounded-xl font-medium text-sm text-slate-600 hover:bg-slate-200 bg-slate-200/50 transition-colors"
              >
                Đóng
              </button>
              {selectedContact.status === 'new' && (
                <button
                  onClick={() => markAsRead(selectedContact.id)}
                  className="px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-[#285c9a] hover:bg-[#1e4a80] transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Đánh dấu đã đọc
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
