import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UpdateModal from '../components/Modal/UpdateModal';
import Navigation from '../components/Navigation';
import Table from '../components/Table';
import styles from './Category.module.css'

const Category = () => {
    const [data, setData] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [apiResponse, setApiResponse] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false)
    const [id, setId] = useState(null)
    const fetchData = async (limit = 10, offset = 0) => {
        const getAllCategories = await axios.get(`http://localhost:5000/api/category/getAllCategories?limit=${limit}&offset=${offset}`);
        console.log(getAllCategories);
        setData(getAllCategories.data.result);
        setTotalCount(getAllCategories.data.total)

    }

    useEffect(() => {
        fetchData().catch(err => { console.log(err); });
    }, [])

    const formSubmitHandler = async (e) => {
        setApiResponse(null)
        e.preventDefault();

        try {
            const result = await axios.post(`http://localhost:5000/api/category/create`, {
                categoryName
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
            <div>
                <Navigation />
                <div className={styles.formContainer}>
                    <h2>Add Categories</h2>
                    <form className={styles.form} onSubmit={formSubmitHandler}>
                        <label htmlFor="categoryName">Category Name</label>
                        <input id="categoryName" type="text" required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        <button className={styles.button}>Add Category</button>
                    </form>
                    {apiResponse && <p className={styles.apiResponse}>{apiResponse}</p>}

                </div>
                <div className={styles.tableContainer}>
                    {totalCount > 0 && <Table tableHeaders={["Id", "categoryName"]} tableValues={data} setTableValues={setData} totalCount={totalCount} currentPage={currentPage} setCurrentPage={setCurrentPage} fetchData={fetchData} content="category" setId={setId} setOpenModal={setOpenModal} />}
                </div>

            </div>
            {openModal && <UpdateModal setOpenModal={setOpenModal} content="Category" id={id} updateRecord={fetchData} />}
        </>

    )
}

export default Category