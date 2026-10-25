<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class BitrixUsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('bitrix_users')->delete();
        
        \DB::table('bitrix_users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'bitrix_id' => '1',
                'name' => 'Sơn Phạm Ngọc',
                'email' => 'phamngocson.k61.qtkd@gmail.com',
                'avatar' => NULL,
                'position' => 'Admin',
                'raw_data' => '{"ID": "1", "NAME": "Sơn", "EMAIL": "phamngocson.k61.qtkd@gmail.com", "ACTIVE": false, "XML_ID": "43359311", "IS_ONLINE": "N", "LAST_NAME": "Phạm Ngọc", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-04-10T06:08:26+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-07-04T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [7], "WORK_POSITION": "Admin", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/1b1/1b1d906cc404228cb6bd2f17a5371617/28471963_795965503928225_7418296781781062187_n - Copy.png", "PERSONAL_GENDER": "M", "PERSONAL_MOBILE": "+84385963223", "PERSONAL_BIRTHDAY": "1998-04-08T03:00:00+04:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2020-12-01T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:42',
                'updated_at' => '2026-10-14 07:50:42',
            ),
            1 => 
            array (
                'id' => 2,
                'bitrix_id' => '6',
                'name' => 'An Đỗ Trường',
                'email' => 'andt.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "6", "NAME": "An", "EMAIL": "andt.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "44001695", "IS_ONLINE": "N", "LAST_NAME": "Đỗ Trường", "TIME_ZONE": "", "USER_TYPE": "employee", "LAST_LOGIN": "2025-03-31T09:26:47+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-12T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [8], "WORK_POSITION": "", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/01e/01edd0ab2d9dbc6b4406ffb4e4de2b31/9373bedb2ca2f4f188246ed17ebda1ef.png", "PERSONAL_GENDER": "M", "PERSONAL_MOBILE": "+84965294808", "PERSONAL_BIRTHDAY": "1996-07-12T03:00:00+04:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2022-03-25T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            2 => 
            array (
                'id' => 3,
                'bitrix_id' => '8',
                'name' => 'Minh Hiếu Trần',
                'email' => 'hieutm.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Chuyên viên kinh doanh',
                'raw_data' => '{"ID": "8", "NAME": "Minh Hiếu", "EMAIL": "hieutm.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "44172203", "IS_ONLINE": "N", "LAST_NAME": "Trần", "TIME_ZONE": "", "USER_TYPE": "employee", "LAST_LOGIN": "2024-02-16T11:17:43+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-12T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [5], "WORK_POSITION": "Chuyên viên kinh doanh", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/524/5243e0cf951d318d5688e6907987a75b/116371b6577e4203247a81df8f595431.png", "PERSONAL_GENDER": "M", "PERSONAL_MOBILE": "+84925833866", "PERSONAL_BIRTHDAY": "1998-01-05T03:00:00+03:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2022-05-04T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            3 => 
            array (
                'id' => 4,
                'bitrix_id' => '10',
                'name' => 'Huy Tuyên Nguyễn',
                'email' => 'tuyennh.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "10", "NAME": "Huy Tuyên", "EMAIL": "tuyennh.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "44194787", "IS_ONLINE": "N", "LAST_NAME": "Nguyễn", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-07T08:03:24+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-12T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [5], "WORK_POSITION": "", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/442/442fe68391d9a6534aecdd5996349a51/z3754377413370_f1090053774b4156d7a18bdd68d68d5d.png", "PERSONAL_GENDER": "M", "PERSONAL_MOBILE": "+84938756999", "PERSONAL_BIRTHDAY": "1993-05-15T03:00:00+04:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2021-02-20T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            4 => 
            array (
                'id' => 5,
                'bitrix_id' => '12',
                'name' => 'Trần Thị Mai Huê',
                'email' => 'huettm.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Kế toán viên',
                'raw_data' => '{"ID": "12", "NAME": "Trần Thị Mai", "EMAIL": "huettm.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "43711937", "IS_ONLINE": "N", "LAST_NAME": "Huê", "TIME_ZONE": "", "USER_TYPE": "employee", "LAST_LOGIN": "2024-12-06T06:15:26+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-12T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [3], "WORK_POSITION": "Kế toán viên", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/3da/3daf1432b2fa1514bb5db3949d1cae74/avatar.png", "PERSONAL_GENDER": "F", "PERSONAL_MOBILE": "+84386419892", "PERSONAL_BIRTHDAY": "2003-12-01T03:00:00+03:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2021-11-01T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            5 => 
            array (
                'id' => 6,
                'bitrix_id' => '14',
                'name' => 'Thanh Phạm Văn',
                'email' => 'thanhpv.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "14", "NAME": "Thanh", "EMAIL": "thanhpv.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "44194783", "IS_ONLINE": "N", "LAST_NAME": "Phạm Văn", "TIME_ZONE": "", "USER_TYPE": "employee", "LAST_LOGIN": "2024-02-18T07:35:01+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-12T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [7], "WORK_POSITION": "", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/6bd/6bd51c389538eb03e025be1cafa8b5e6/z3485839531118_275a1448f00e335823c5cfdac6f48ad1.jpg.png", "PERSONAL_GENDER": "", "PERSONAL_MOBILE": "+84982043634", "PERSONAL_BIRTHDAY": "1986-11-14T03:00:00+03:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2021-04-01T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            6 => 
            array (
                'id' => 7,
                'bitrix_id' => '16',
                'name' => 'Trần Công Tình',
                'email' => 'tinhtc.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "16", "NAME": "Trần Công", "EMAIL": "tinhtc.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "43711927", "IS_ONLINE": "N", "LAST_NAME": "Tình", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2025-10-24T13:22:06+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-12T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [12], "WORK_POSITION": "", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/f21/f215367b1ee8ffe3fd9c75dde23c04a9/avatar.png", "PERSONAL_GENDER": "M", "PERSONAL_MOBILE": "+84985385234", "PERSONAL_BIRTHDAY": "1985-12-12T03:00:00+03:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2021-03-01T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            7 => 
            array (
                'id' => 8,
                'bitrix_id' => '18',
                'name' => 'Tĩnh Lương Văn',
                'email' => 'tinhlv.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Chuyên viên kĩ thuật',
                'raw_data' => '{"ID": "18", "NAME": "Tĩnh", "EMAIL": "tinhlv.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "44194781", "IS_ONLINE": "N", "LAST_NAME": "Lương Văn", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2025-10-01T04:37:59+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-12T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [8], "WORK_POSITION": "Chuyên viên kĩ thuật", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/170/170de26b4df38569afe04d3e3f9f5a2c/37d8919c084acb6ebae9858319bbf6a1.png", "PERSONAL_GENDER": "", "PERSONAL_MOBILE": "+84972938441", "PERSONAL_BIRTHDAY": "1998-08-17T03:00:00+04:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2022-04-01T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            8 => 
            array (
                'id' => 9,
                'bitrix_id' => '20',
                'name' => 'Minh Tuấn Trương',
                'email' => 'tuantm.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Chuyên viên kinh doanh',
                'raw_data' => '{"ID": "20", "NAME": "Minh Tuấn", "EMAIL": "tuantm.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "44194819", "IS_ONLINE": "N", "LAST_NAME": "Trương", "TIME_ZONE": "Asia/Bangkok", "USER_TYPE": "employee", "LAST_LOGIN": "2026-09-10T09:13:26+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-12T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [5], "WORK_POSITION": "Chuyên viên kinh doanh", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/ec7/ec726f0451f4424a07e47c9ca1449d35/avatar.png", "PERSONAL_GENDER": "M", "PERSONAL_MOBILE": "+84898767333", "PERSONAL_BIRTHDAY": "1993-08-20T03:00:00+04:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2021-06-01T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            9 => 
            array (
                'id' => 10,
                'bitrix_id' => '22',
                'name' => 'Diệp Hoàng Thị Thanh',
                'email' => 'diephtt.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "22", "NAME": "Diệp", "EMAIL": "diephtt.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "43711971", "IS_ONLINE": "N", "LAST_NAME": "Hoàng Thị Thanh", "TIME_ZONE": "", "USER_TYPE": "employee", "LAST_LOGIN": "2025-05-04T10:07:52+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-12T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [7], "WORK_POSITION": "", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/b13/b138671cc5f941ef757a6cdf6a262908/2492010777a3be381ce4c254b62bfad2.png", "PERSONAL_GENDER": "F", "PERSONAL_MOBILE": "+84327295343", "PERSONAL_BIRTHDAY": "2003-09-21T03:00:00+04:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2022-01-01T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            10 => 
            array (
                'id' => 11,
                'bitrix_id' => '24',
                'name' => 'Miền Nguyễn Thị Hương',
                'email' => 'miennth.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Kế toán viên',
                'raw_data' => '{"ID": "24", "NAME": "Miền", "EMAIL": "miennth.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "44194797", "IS_ONLINE": "N", "LAST_NAME": "Nguyễn Thị Hương", "TIME_ZONE": "", "USER_TYPE": "employee", "LAST_LOGIN": "2024-12-09T13:08:49+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-12T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [8], "WORK_POSITION": "Kế toán viên", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/d64/d648988ab7aea0a3e5a9a85368c984c4/avatar.png", "PERSONAL_GENDER": "", "PERSONAL_MOBILE": "+84356514233", "PERSONAL_BIRTHDAY": "2003-09-01T03:00:00+04:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2022-08-01T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            11 => 
            array (
                'id' => 12,
                'bitrix_id' => '26',
                'name' => 'Hoàng Lê Quang Hòa',
                'email' => 'hoahlq.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Giám đốc điều hành',
                'raw_data' => '{"ID": "26", "NAME": "Hoàng Lê Quang", "EMAIL": "hoahlq.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "43711949", "IS_ONLINE": "Y", "LAST_NAME": "Hòa", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-07T10:22:26+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-12T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [1], "WORK_POSITION": "Giám đốc điều hành", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/fe7/fe720366a1e7f8693c0a86f54fcb81f7/1.jpg.png", "PERSONAL_GENDER": "M", "PERSONAL_MOBILE": "+84987603588", "PERSONAL_BIRTHDAY": "1985-01-23T03:00:00+03:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2020-02-28T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            12 => 
            array (
                'id' => 13,
                'bitrix_id' => '28',
                'name' => 'Văn Nhuận Hoàng',
                'email' => 'nhuanhv2.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Trưởng phòng kĩ thuật',
                'raw_data' => '{"ID": "28", "NAME": "Văn Nhuận", "EMAIL": "nhuanhv2.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "44300857", "IS_ONLINE": "N", "LAST_NAME": "Hoàng", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-13T17:16:11+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-08-15T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [8], "WORK_POSITION": "Trưởng phòng kĩ thuật", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/151/151e39e01978ade6450a5a54ffa27b1b/avatar.png", "PERSONAL_GENDER": "M", "PERSONAL_MOBILE": "+84963123912", "PERSONAL_BIRTHDAY": "1989-07-18T03:00:00+04:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2021-05-02T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            13 => 
            array (
                'id' => 14,
                'bitrix_id' => '30',
                'name' => 'Hường Nguyễn Thị',
                'email' => 'huongnt.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Kế toán trưởng',
                'raw_data' => '{"ID": "30", "NAME": "Hường", "EMAIL": "huongnt.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "44305651", "IS_ONLINE": "N", "LAST_NAME": "Nguyễn Thị", "TIME_ZONE": "", "USER_TYPE": "employee", "LAST_LOGIN": "2022-11-15T10:54:14+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-10-03T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [3], "WORK_POSITION": "Kế toán trưởng", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/c26/c26307f5e838ecef6bf4b0b63bd2dca6/1381919_613335378719007_426995143_n.jpg.png", "PERSONAL_GENDER": "F", "PERSONAL_MOBILE": "+84978258607", "PERSONAL_BIRTHDAY": "1988-06-24T03:00:00+04:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2020-02-28T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            14 => 
            array (
                'id' => 15,
                'bitrix_id' => '32',
                'name' => 'Kiêm Trương Văn',
                'email' => 'kiemtv.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "32", "NAME": "Kiêm", "EMAIL": "kiemtv.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "45584033", "IS_ONLINE": "N", "LAST_NAME": "Trương Văn", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-14T05:34:01+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2022-10-24T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [8], "WORK_POSITION": "", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/aae/aaed965f266ae220c647705242d2fcac/avatar.png", "PERSONAL_GENDER": "", "PERSONAL_MOBILE": "+84898290333", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:43',
                'updated_at' => '2026-10-14 07:50:43',
            ),
            15 => 
            array (
                'id' => 16,
                'bitrix_id' => '34',
                'name' => 'Ngọc Tiến Phạm',
                'email' => 'tienpn.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Chuyên viên Marketing',
                'raw_data' => '{"ID": "34", "NAME": "Ngọc Tiến", "EMAIL": "tienpn.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "46795619", "IS_ONLINE": "N", "LAST_NAME": "Phạm", "USER_TYPE": "employee", "LAST_LOGIN": "2023-01-03T13:59:59+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2023-01-03T03:00:00+03:00", "UF_DEPARTMENT": [7], "WORK_POSITION": "Chuyên viên Marketing", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            16 => 
            array (
                'id' => 17,
                'bitrix_id' => '36',
                'name' => 'Phạm Thế Huỳnh',
                'email' => 'huynhpt.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Chuyên viên kỹ thuật',
                'raw_data' => '{"ID": "36", "NAME": "Phạm", "EMAIL": "huynhpt.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "48422245", "IS_ONLINE": "N", "LAST_NAME": "Thế Huỳnh", "TIME_ZONE": "", "USER_TYPE": "employee", "LAST_LOGIN": "2023-07-29T20:40:42+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2023-03-29T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [8], "WORK_POSITION": "Chuyên viên kỹ thuật", "PERSONAL_GENDER": "M", "PERSONAL_MOBILE": "+84936791314", "PERSONAL_BIRTHDAY": "1999-05-09T03:00:00+04:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2023-02-10T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            17 => 
            array (
                'id' => 18,
                'bitrix_id' => '38',
                'name' => 'Ngọc Phương Trần',
                'email' => 'phuongtn.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "38", "NAME": "Ngọc Phương", "EMAIL": "phuongtn.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "48899539", "IS_ONLINE": "N", "LAST_NAME": "Trần", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-03-14T21:36:32+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2023-04-24T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [5], "WORK_POSITION": "", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/11a/11a0c70cf4ad452ad12d2ce65d05d360/avatar.png", "PERSONAL_GENDER": "", "PERSONAL_MOBILE": "", "PERSONAL_BIRTHDAY": "2023-12-20T03:00:00+03:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            18 => 
            array (
                'id' => 19,
                'bitrix_id' => '40',
                'name' => 'Sơn Nguyễn Văn',
                'email' => 'sonnv.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "40", "NAME": "Sơn", "EMAIL": "sonnv.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "51190015", "IS_ONLINE": "N", "LAST_NAME": "Nguyễn Văn", "USER_TYPE": "employee", "LAST_LOGIN": "2025-02-07T11:18:54+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2023-09-05T03:00:00+03:00", "UF_DEPARTMENT": [8], "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/2a7/2a728486e3b6d76817c034cea102cbf2/Untitled.png", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            19 => 
            array (
                'id' => 20,
                'bitrix_id' => '42',
                'name' => 'Đức Lương Trần',
                'email' => 'luongtd.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "42", "NAME": "Đức Lương", "EMAIL": "luongtd.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "51190279", "IS_ONLINE": "N", "LAST_NAME": "Trần", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-13T05:54:08+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2023-09-05T03:00:00+03:00", "UF_DEPARTMENT": [8], "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            20 => 
            array (
                'id' => 21,
                'bitrix_id' => '46',
                'name' => 'Trương Quang Khải',
                'email' => 'khaitq.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "46", "NAME": "Trương", "EMAIL": "khaitq.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "54057479", "IS_ONLINE": "N", "LAST_NAME": "Quang Khải", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-12T15:37:15+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2024-02-28T03:00:00+03:00", "UF_DEPARTMENT": [8], "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            21 => 
            array (
                'id' => 22,
                'bitrix_id' => '50',
                'name' => 'Đồng Nguyễn Văn',
                'email' => 'dongnv.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "50", "NAME": "Đồng", "EMAIL": "dongnv.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "55138613", "IS_ONLINE": "N", "LAST_NAME": "Nguyễn Văn", "TIME_ZONE": "Asia/Bangkok", "USER_TYPE": "employee", "LAST_LOGIN": "2026-08-05T07:03:53+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2024-04-25T03:00:00+03:00", "UF_DEPARTMENT": [5], "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            22 => 
            array (
                'id' => 23,
                'bitrix_id' => '52',
                'name' => 'Vân Anh Trần',
                'email' => 'anhtv.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "52", "NAME": "Vân Anh", "EMAIL": "anhtv.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "57063637", "IS_ONLINE": "N", "LAST_NAME": "Trần", "TIME_ZONE": "", "USER_TYPE": "employee", "LAST_LOGIN": "2024-10-09T12:32:18+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2024-08-20T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [7], "WORK_POSITION": "", "PERSONAL_GENDER": "", "PERSONAL_MOBILE": "+84328532742", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            23 => 
            array (
                'id' => 24,
                'bitrix_id' => '54',
                'name' => 'Trang Nguyễn Thị Thu',
                'email' => 'trangntt.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "54", "NAME": "Trang", "EMAIL": "trangntt.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "57063679", "IS_ONLINE": "N", "LAST_NAME": "Nguyễn Thị Thu", "USER_TYPE": "employee", "LAST_LOGIN": "2024-09-06T11:02:33+03:00", "SECOND_NAME": "Mộc Trang", "TIMESTAMP_X": [], "DATE_REGISTER": "2024-08-20T03:00:00+03:00", "UF_DEPARTMENT": [7], "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/e59/e59d4e76930863005dd25da189506dba/z5625415389993_7527a4e87f87aa86c1f9295f717b9330.jpg.png", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            24 => 
            array (
                'id' => 25,
                'bitrix_id' => '56',
                'name' => 'Phạm Lê Minh Hiếu',
                'email' => 'hieuplm.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Nhân viên kĩ thuật',
                'raw_data' => '{"ID": "56", "NAME": "Phạm Lê Minh", "EMAIL": "hieuplm.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "57320161", "IS_ONLINE": "N", "LAST_NAME": "Hiếu", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-13T17:51:25+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2024-09-04T03:00:00+03:00", "UF_DEPARTMENT": [8], "WORK_POSITION": "Nhân viên kĩ thuật", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/33b/33b0aaec71be8ff782e3bf5282bed332/avatar.png", "PERSONAL_GENDER": "M", "PERSONAL_MOBILE": "+84964212368", "PERSONAL_BIRTHDAY": "1999-09-09T03:00:00+04:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            25 => 
            array (
                'id' => 26,
                'bitrix_id' => '62',
                'name' => 'Khánh Dương Nguyễn',
                'email' => 'duongnk.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "62", "NAME": "Khánh Dương", "EMAIL": "duongnk.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "57733193", "IS_ONLINE": "N", "LAST_NAME": "Nguyễn", "TIME_ZONE": "Asia/Bangkok", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-10T03:34:27+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2024-09-25T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [5], "WORK_POSITION": "", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/1b2/1b2a76acf36f86e148cc51d48cc27314/341850583_948984269883818_8529665720717707592_n.jpg.png", "PERSONAL_GENDER": "", "PERSONAL_MOBILE": "+84373413878", "PERSONAL_BIRTHDAY": "2002-03-21T03:00:00+03:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            26 => 
            array (
                'id' => 27,
                'bitrix_id' => '68',
                'name' => 'Nguyễn Văn Huy 99',
                'email' => 'huynv1999.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "68", "NAME": "Nguyễn Văn Huy 99", "EMAIL": "huynv1999.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "60691509", "IS_ONLINE": "N", "LAST_NAME": "", "USER_TYPE": "employee", "LAST_LOGIN": "2025-04-14T10:03:34+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2025-02-13T03:00:00+03:00", "UF_DEPARTMENT": [8], "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/f53/f53ca49679cddddf9b0225e4a438ab08/d11be79a2edef5b251725472098f7ac4.png", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            27 => 
            array (
                'id' => 28,
                'bitrix_id' => '70',
                'name' => 'Nguyễn Văn Huy',
                'email' => 'huynv2001.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "70", "NAME": "Nguyễn Văn Huy", "EMAIL": "huynv2001.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "60691541", "IS_ONLINE": "N", "LAST_NAME": "", "USER_TYPE": "employee", "LAST_LOGIN": "2025-02-22T08:29:28+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2025-02-13T03:00:00+03:00", "UF_DEPARTMENT": [8], "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/86d/86d131aafe50dd95609e73db1793898b/9f52049a-14ed-4e7b-8371-01366c1bf84c.jpg.png", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            28 => 
            array (
                'id' => 29,
                'bitrix_id' => '72',
                'name' => 'Vui Đặng Thị',
                'email' => 'vuidt.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "72", "NAME": "Vui", "EMAIL": "vuidt.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "62451095", "IS_ONLINE": "N", "LAST_NAME": "Đặng Thị", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2025-08-03T06:57:58+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2025-05-07T03:00:00+03:00", "UF_DEPARTMENT": [1], "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/743/74326ffaa5093d7cc30bfd9aa4f546ea/m_o mem_m.jpg.png", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:44',
                'updated_at' => '2026-10-14 07:50:44',
            ),
            29 => 
            array (
                'id' => 30,
                'bitrix_id' => '74',
                'name' => 'Tuấn Thành Phạm',
                'email' => 'thanhpt.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "74", "NAME": "Tuấn Thành", "EMAIL": "thanhpt.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "64736495", "IS_ONLINE": "N", "LAST_NAME": "Phạm", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-03-26T13:09:25+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2025-08-19T03:00:00+03:00", "UF_DEPARTMENT": [8], "WORK_POSITION": "", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/7e3/7e3897313d6ae6e372a53b84cd0a7a39/520273150_4173375452878792_4407810688767281181_n.jpg.png", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            30 => 
            array (
                'id' => 31,
                'bitrix_id' => '76',
                'name' => 'Trung Trịnh Văn',
                'email' => 'trungtv.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Chuyên viên kỹ thuật',
                'raw_data' => '{"ID": "76", "NAME": "Trung", "EMAIL": "trungtv.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "65257767", "IS_ONLINE": "Y", "LAST_NAME": "Trịnh Văn", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-14T10:25:43+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2025-09-11T03:00:00+03:00", "UF_DEPARTMENT": [8], "WORK_POSITION": "Chuyên viên kỹ thuật", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/1ac/1acadf4f452259df9f81fd73c05a8dd0/Untitled.png", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            31 => 
            array (
                'id' => 32,
                'bitrix_id' => '78',
                'name' => 'Ngọc Khuất Minh',
                'email' => 'phuongnh.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "78", "NAME": "Ngọc", "EMAIL": "phuongnh.tmhp@gmail.com", "ACTIVE": false, "XML_ID": "65543355", "IS_ONLINE": "N", "LAST_NAME": "Khuất Minh", "TIME_ZONE": "Asia/Bangkok", "USER_TYPE": "employee", "LAST_LOGIN": "2026-04-13T05:56:36+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2025-09-24T03:00:00+03:00", "UF_DEPARTMENT": [7], "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/f91/f91810aac247dfb62724b5f8da94baeb/90eb3d339e18945c3f0b740cb5448089.jpg.png", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            32 => 
            array (
                'id' => 33,
                'bitrix_id' => '82',
                'name' => 'Dũng Bùi Văn',
                'email' => 'dungbv.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => 'Chuyên viên kĩ thuật',
                'raw_data' => '{"ID": "82", "NAME": "Dũng", "EMAIL": "dungbv.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "65719759", "IS_ONLINE": "N", "LAST_NAME": "Bùi Văn", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-13T15:57:28+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2025-10-02T03:00:00+03:00", "UF_DEPARTMENT": [8], "WORK_POSITION": "Chuyên viên kĩ thuật", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/ba1/ba113721e35766daf19e1057ab229428/avatar.png", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            33 => 
            array (
                'id' => 34,
                'bitrix_id' => '84',
                'name' => 'Quỳnh Phạm',
                'email' => 'quynhpt.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "84", "NAME": "Quỳnh", "EMAIL": "quynhpt.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "65843815", "IS_ONLINE": "N", "LAST_NAME": "Phạm", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-03-14T06:46:28+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2025-10-08T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [7], "WORK_POSITION": "", "PERSONAL_GENDER": "", "PERSONAL_MOBILE": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            34 => 
            array (
                'id' => 35,
                'bitrix_id' => '90',
                'name' => 'Quỳnh Phạm',
                'email' => 'quynhpham.tmhp0309@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "90", "NAME": "Quỳnh", "EMAIL": "quynhpham.tmhp0309@gmail.com", "ACTIVE": false, "XML_ID": "67384703", "IS_ONLINE": "N", "LAST_NAME": "Phạm", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2025-12-23T11:58:00+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2025-12-23T03:00:00+03:00", "UF_DEPARTMENT": [1], "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            35 => 
            array (
                'id' => 36,
                'bitrix_id' => '92',
                'name' => 'Hữu Hiển Nguyễn',
                'email' => 'hiennh.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "92", "NAME": "Hữu Hiển", "EMAIL": "hiennh.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "69215087", "IS_ONLINE": "N", "LAST_NAME": "Nguyễn", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-14T06:19:26+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2026-03-10T03:00:00+03:00", "UF_DEPARTMENT": [8], "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            36 => 
            array (
                'id' => 37,
                'bitrix_id' => '94',
                'name' => 'ADMIN Thang Máy Hải Phát',
                'email' => 'admin.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "94", "NAME": "ADMIN", "EMAIL": "admin.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "69265835", "IS_ONLINE": "Y", "LAST_NAME": "Thang Máy Hải Phát", "TIME_ZONE": "Asia/Bangkok", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-14T10:42:05+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2026-03-12T03:00:00+03:00", "UF_DEPARTMENT": [1], "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/6ad/6ad13161c7f7700d7618e49a14b092e3/logo-tron-thang-may-gia-dinh-hai-phat.jpg.png", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            37 => 
            array (
                'id' => 38,
                'bitrix_id' => '98',
                'name' => 'Ngọc Khuất Minh',
                'email' => 'kmngoc.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "98", "NAME": "Ngọc", "EMAIL": "kmngoc.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "70085911", "IS_ONLINE": "N", "LAST_NAME": "Khuất Minh", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-07-20T09:34:55+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2026-04-14T03:00:00+03:00", "UF_DEPARTMENT": [1], "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/f9a/f9a595bbc8de0c52cd25e6ad538533db/90eb3d339e18945c3f0b740cb5448089.jpg.png", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            38 => 
            array (
                'id' => 39,
                'bitrix_id' => '100',
                'name' => 'Hoàng Đại',
                'email' => 'daitmh.tmhp@gmail.com',
                'avatar' => NULL,
                'position' => NULL,
                'raw_data' => '{"ID": "100", "NAME": "Hoàng", "EMAIL": "daitmh.tmhp@gmail.com", "ACTIVE": true, "XML_ID": "71417743", "IS_ONLINE": "N", "LAST_NAME": "Đại", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-07-02T06:31:22+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2026-06-16T03:00:00+03:00", "UF_DEPARTMENT": [8], "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            39 => 
            array (
                'id' => 40,
                'bitrix_id' => '102',
                'name' => 'Quân Đặng Thế',
                'email' => 'dangquan180103@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "102", "NAME": "Quân", "EMAIL": "dangquan180103@gmail.com", "ACTIVE": true, "XML_ID": "71676431", "IS_ONLINE": "N", "LAST_NAME": "Đặng Thế", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-13T14:12:41+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2026-07-01T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [8], "WORK_POSITION": "", "PERSONAL_PHOTO": "https://cdn.bitrix24.vn/b22004543/main/92d/92df86043d77022c35b449361ca27d30/avatar.png", "PERSONAL_GENDER": "M", "PERSONAL_MOBILE": "+84339416018", "PERSONAL_COUNTRY": "0", "PERSONAL_BIRTHDAY": "2003-01-18T03:00:00+03:00", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": "2026-04-01T03:00:00+03:00"}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            40 => 
            array (
                'id' => 41,
                'bitrix_id' => '104',
                'name' => 'Dũng Mạnh Xuân',
                'email' => 'dung02113adt@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "104", "NAME": "Dũng", "EMAIL": "dung02113adt@gmail.com", "ACTIVE": false, "XML_ID": "71676435", "IS_ONLINE": "N", "LAST_NAME": "Mạnh Xuân", "TIME_ZONE": "", "USER_TYPE": "employee", "LAST_LOGIN": "", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2026-07-01T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [1], "WORK_POSITION": "", "PERSONAL_GENDER": "", "PERSONAL_MOBILE": "", "PERSONAL_BIRTHDAY": "", "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            41 => 
            array (
                'id' => 42,
                'bitrix_id' => '106',
                'name' => 'Đôn Lê Quý',
                'email' => 'donkem1409@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "106", "NAME": "Đôn", "EMAIL": "donkem1409@gmail.com", "ACTIVE": true, "XML_ID": "71676447", "IS_ONLINE": "N", "LAST_NAME": "Lê Quý", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-12T04:50:18+03:00", "TIMESTAMP_X": [], "DATE_REGISTER": "2026-07-01T03:00:00+03:00", "UF_DEPARTMENT": [8], "WORK_POSITION": "", "PERSONAL_GENDER": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:45',
                'updated_at' => '2026-10-14 07:50:45',
            ),
            42 => 
            array (
                'id' => 43,
                'bitrix_id' => '108',
                'name' => 'Dũng Mạnh Xuân',
                'email' => 'dung021103adt@gmail.com',
                'avatar' => NULL,
                'position' => '',
                'raw_data' => '{"ID": "108", "NAME": "Dũng", "EMAIL": "dung021103adt@gmail.com", "ACTIVE": true, "XML_ID": "71680231", "IS_ONLINE": "N", "LAST_NAME": "Mạnh Xuân", "TIME_ZONE": "Asia/Saigon", "USER_TYPE": "employee", "LAST_LOGIN": "2026-10-11T13:09:09+03:00", "WORK_PHONE": "", "SECOND_NAME": "", "TIMESTAMP_X": [], "PERSONAL_WWW": "", "DATE_REGISTER": "2026-07-01T03:00:00+03:00", "PERSONAL_CITY": "", "UF_DEPARTMENT": [8], "WORK_POSITION": "", "PERSONAL_GENDER": "", "PERSONAL_MOBILE": "", "PERSONAL_BIRTHDAY": "", "LAST_ACTIVITY_DATE": [], "UF_EMPLOYMENT_DATE": ""}',
                'created_at' => '2026-10-14 07:50:46',
                'updated_at' => '2026-10-14 07:50:46',
            ),
        ));
        
        
    }
}