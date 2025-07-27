# Langkah Cepat Menjalankan Proyek

```bash
# 1. Clone repository
git clone https://github.com/username/bursa-talenta-api.git
cd bursa-talenta-api

# 2. Install dependencies
npm install

# 3. Buat file .env dan isi dengan:
# DATABASE_URL="mysql://root:@localhost:3306/bursa_talenta"

# 4. Buat database jika belum ada
mysql -u root -e "CREATE DATABASE bursa_talenta;"

# 5. Jalankan migrasi Prisma
npx prisma migrate dev --name init

# 6. Jalankan server
npm run dev

# 7. Akses di browser
# http://localhost:3000
