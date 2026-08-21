import { createClient } from '@supabase/supabase-js';
import { serviceItems } from '../src/data/services';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log('Bắt đầu thêm dữ liệu services vào database...');
  
  for (let i = 0; i < serviceItems.length; i++) {
    const item = serviceItems[i];
    
    // Map data to match DbService interface
    const dbItem = {
      slug: item.id,
      title: item.title,
      subtitle: item.subtitle,
      icon: item.icon,
      short_description: item.shortDescription,
      full_description: item.fullDescription,
      highlights: item.highlights,
      process: item.process,
      sort_order: i,
      is_published: true,
    };
    
    // Sử dụng upsert dựa trên cột slug để cập nhật nếu đã tồn tại
    const { error } = await supabase.from('services').upsert([dbItem], { onConflict: 'slug' });
    
    if (error) {
      console.error(`❌ Lỗi khi thêm ${item.id}:`, error.message);
    } else {
      console.log(`✅ Đã thêm/cập nhật thành công: ${item.title}`);
    }
  }
  
  console.log('Hoàn thành!');
}

main().catch(console.error);
