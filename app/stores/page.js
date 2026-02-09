// app/stores/page.jsx
import { getStores } from '@/app/lib/storeData' // مسیر فایل api خود را وارد کنید
import StoresList from '@/app/component/StoresList' // مسیر کامپوننت کلاینت را وارد کنید

export default async function StoresPage() {
  let stores = [];
  let error = '';

  try {
    stores = await getStores();
  } catch (err) {
    error = err.message;
  }

  return <StoresList initialStores={stores} errorMessage={error} />;
}