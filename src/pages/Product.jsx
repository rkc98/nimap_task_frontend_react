import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UpdateModal from '../components/Modal/UpdateModal';
import Navigation from '../components/Navigation';
import Table from '../components/Table';
import styles from './Product.module.css'
const Product = () => {
  const [data, setData] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState(null)
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState('')
  const fetchData = async (limit = 10, offset = 0) => {
    console.log(limit, offset);
    const getAllProducts = await axios.get(`http://localhost:5000/api/product/getAllproducts?limit=${limit}&offset=${offset}`);
    console.log(getAllProducts);
    setData(getAllProducts.data.result);
    setTotalCount(getAllProducts.data.total)
    const getAllCategories = await axios.get(`http://localhost:5000/api/category/getAllCategories`);
    console.log(getAllCategories);
    setCategories(getAllCategories.data.result)

  }

  useEffect(() => {
    fetchData().catch(err => { console.log(err); });
  }, []);

  const handleCategory = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const categoryId = el.getAttribute('id');
    setCategoryId(categoryId)
    setCategoryName(e.target.value);
  }

  const formSubmitHandler = async (e) => {
    setApiResponse(null)
    e.preventDefault();

    try {
      const result = await axios.post(`http://localhost:5000/api/product/create`, {
        productName,
        categoryName,
        categoryId
      });
      setApiResponse("Record Inserted Successfully")
      fetchData().catch(err => { console.log(err) });

    } catch (err) {
      console.log(err.response.data.message);
      setApiResponse(err.response.data.message);
    }

  }


  return (
    <>
      <div >
        <Navigation />
        <div className={styles.formContainer}>
          <h2>Add Products</h2>
          <form className={styles.form} onSubmit={formSubmitHandler}>
            <label htmlFor="productName">Product Name</label>
            <input id="productName" type="text" required value={productName} onChange={(e) => setProductName(e.target.value)} />
            <label htmlFor='category' />
            Select Category:
            <select
              name="category"
              value={categoryName}
              onChange={(e) => handleCategory(e)}
              required
              className={styles.formSelect}
            >
              <option value="" disabled>please select category</option>
              {categories.map((category) => (
                <option id={category.Id} key={category.Id}>{category.categoryName}</option>
              ))}
            </select>
            <button className={styles.button}>Add Category</button>
          </form>
          {apiResponse && <p className={styles.apiResponse}>{apiResponse}</p>}
        </div>
        <div className={styles.tableContainer}>
          {totalCount > 0 && <Table tableHeaders={["productId", "productName", "categoryName", "categoryId"]} totalCount={totalCount} tableValues={data} setTableValues={setData} currentPage={currentPage} setCurrentPage={setCurrentPage} fetchData={fetchData} content="product" setOpenModal={setOpenModal} setId={setId} />}
        </div>
      </div>
      {openModal && <UpdateModal setOpenModal={setOpenModal} content="Product" id={id} updateRecord={fetchData} />}
    </>

  )
}

export default Product