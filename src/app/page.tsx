'use client';

import { useEffect, useState } from "react";
import { SalesBoard } from "./Services/MyAllServices";

export default function Home() {
  const [sales, setSales] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [addProduct, setAddProduct] = useState(false);
  const [addProductToSale, setAddProductToSale] = useState(false);
  const [ProductName, setProductName] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(sales);


  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await SalesBoard.GetAllProducts();
        setResults(res.result);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addProduct,setAddProduct]);

  const handleProductsClick = () => {
    setAddProduct(true);
  };

  const handleAddToSale = () => {
    if (!selectedProduct || !quantity || !price) {
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 2000);
      return;
    }
  
    const newSale = {
      product: selectedProduct,
      quantity: Number(quantity),
      price: Number(price),
      total: Number(quantity) * Number(price),
    };
  
    setSales([...sales, newSale]);
    setAddProductToSale(true);
  
    // Clear fields
    setSelectedProduct('');
    setQuantity('');
    setPrice('');
    
  };
  

  const handleAddNewProduct = async () => {
    if (!ProductName.trim()) {
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 2000);
      return;
    }

    try {
      const res = await SalesBoard.NewProduct(ProductName);
      console.log(res);

      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(false), 2000);
      setProductName("");
      setAddProduct(false)
    } catch (error) {
      console.error(error);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 2000);
    }
  };

  const handleReturn=()=>{
    setAddProduct(false);

  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6">
      {/* ✅ Alerts */}
      {successAlert && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition duration-300">
          ✅ تم إضافة المنتج بنجاح
        </div>
      )}

      {errorAlert && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition duration-300 z-50">
          ❌ يرجى إدخال اسم المنتج
        </div>
      )}

      {/* ✅ Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : !addProduct ? (
        <>
          {/* ✅ Main Product Form */}
          <h1 className="text-center text-4xl font-bold text-[#1E3A8A] mt-10">
            برنامج تسجيل المبيعات اليومية
          </h1>
          <p className="text-center text-sm text-[#374151] mt-2 mb-6">
            {new Date().toISOString().split("T")[0]}
          </p>

          <div className="w-[60%] mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block mb-1 text-right text-sm font-medium text-[#1E3A8A]">
                اسم المنتج
              </label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-right"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option>إختر إسم المنتج</option>
                {results.map((res: any, index) => (
                  <option key={index} value={res.ProductName}>
                    {res.ProductName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block mb-1 text-right text-sm font-medium text-[#1E3A8A]"
                 
                >
                  الكمية
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-right"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-right text-sm font-medium text-[#1E3A8A]">
                  سعر البيع
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-right"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleAddToSale}
                className="w-[50%] cursor-pointer bg-[#16A34A] hover:bg-green-500 text-white font-semibold py-2 rounded">
                إضافة إلى المبيعات
              </button>
              <button
                onClick={handleProductsClick}
                className="w-[50%] cursor-pointer bg-[#1E3A8A] hover:bg-blue-600 text-white font-semibold py-2 rounded"
              >
                إضافةالمنتجات
              </button>
            </div>

          </div>
          {addProductToSale && sales.length > 0 && (
            <div className="w-[60%] mx-auto bg-white p-6 rounded-lg shadow-md mt-6 ">
              <table className="w-full text-sm text-right text-gray-700 border rounded overflow-hidden">
                <thead className="text-xs text-gray-700 bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 border-b-2 ">حذف</th>
                    <th className="px-4 py-3 border-b-2 ">المجموع</th>
                    <th className="px-4 py-3 border-b-2 ">السعر</th>
                    <th className="px-4 py-3 border-b-2 ">الكمية</th>
                    <th className="px-4 py-3 border-b-2 ">اسم المنتج</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((item:any, index:number) => (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2 border">
                        <button
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                          onClick={() => {
                            setSales(sales.filter((_: any, i: number) => i !== index));
                            
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-6 0V5a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-4 py-2 border">{item.total}</td>
                      <td className="px-4 py-2 border">{item.price}</td>
                      <td className="px-4 py-2 border">{item.quantity}</td>
                      <td className="px-4 py-2 border">{item.product}</td>
                    </tr>
                  ))}                
                </tbody>
                <tfoot>
                  <tr className="bg-white font-bold">
                    <td colSpan={3} className="px-4 py-3 text-black text-lg text-center">
                    {sales.reduce((acc: number, item: any) => acc + item.total, 0)} درهم
                    </td>
                    <td colSpan={3} className="px-4 py-3 text-green-700 text-lg text-center">
                      المجموع الكلي
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
)}




        </>
      ) : (
        <>
          {/* ✅ Add New Product Form */}
          <div className="w-[60%] mx-auto bg-white p-6 rounded-lg shadow-md mt-20">
            <div className="mb-4">
              <label className="block mb-1 text-right text-sm font-medium text-[#1E3A8A]">
                اسم المنتج
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-right"
                placeholder="أكتب اسم المنتج"
                value={ProductName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <div className="flex gap-4">
                <button
                  onClick={handleAddNewProduct}
                  className="w-[50%] cursor-pointer bg-[#16A34A] hover:bg-green-500 mt-10 text-white font-semibold py-2 rounded mx-auto block"
                >
                  إضافة منتج
                </button>
                <button
                  onClick={handleReturn}
                  className="w-[50%] cursor-pointer bg-[#e90f0f] hover:bg-red-500 mt-10 text-white font-semibold py-2 rounded mx-auto block"
                >
                  عودة
                </button>
              </div>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
}
