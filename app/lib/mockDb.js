// app/lib/mockDb.js

// دیتابیس تستی کارمندان
if (!global.employeeDB) {
  global.employeeDB = [
    { 
      id: 1, 
      first_name: "رهام", 
      last_name: "رضوی", 
      username: "emp", 
      password: "1234", 
      role: "employee", 
      phone: "09121111111", 
      credit_limit: 1500000 
    }
  ];
}

// دیتابیس تستی مدیران (جدید)
if (!global.managerDB) {
  global.managerDB = [
    {
      id: 1001,
      first_name: "مدیر",
      last_name: "نئونی",
      username: "admin",
      password: "1234",
      role: "company_manager",
      email: "manager@neon.com",
      phone: "09120000000",
      company: { id: 1, name: "شرکت نئون" }
    }
  ];
}

if (!global.storeDB) {
  global.storeDB = [
    { id: 101, name: "فروشگاه تست ۱", address: "تهران، ونک", phone: "021888888" },
    { id: 102, name: "فروشگاه تست ۲", address: "تهران، آزادی", phone: "021666666" },
  ];
}

export const db = {
  get employees() { return global.employeeDB; },
  get managers() { return global.managerDB; }, // اضافه شد
  get stores() { return global.storeDB; }
};