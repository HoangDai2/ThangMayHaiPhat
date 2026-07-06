import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { serviceItems } from '../../data/services';

export default function AdminServices() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = serviceItems.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      alert('Dịch vụ đã được xóa (demo)');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quản lý dịch vụ</h1>
          <p className="text-slate-500 mt-1">Quản lý danh sách dịch vụ của công ty</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          <Plus className="w-5 h-5" />
          Thêm dịch vụ
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-slate-800">{service.title}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {service.highlights.length} điểm nổi bật
                  </span>
                </div>
                <p className="text-slate-500 text-sm mb-3">{service.subtitle}</p>
                <p className="text-slate-600">{service.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.highlights.slice(0, 4).map((highlight, index) => (
                    <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                      {highlight}
                    </span>
                  ))}
                  {service.highlights.length > 4 && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-sm">
                      +{service.highlights.length - 4} khác
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  <Edit className="w-4 h-4" />
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-slate-500">Không tìm thấy dịch vụ nào</p>
        </div>
      )}
    </div>
  );
}
