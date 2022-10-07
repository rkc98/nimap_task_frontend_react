import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './UpdateModal.module.css'
const UpdateModal = (props) => {
    const { setOpenModal, content, id, updateRecord } = props;
    const [productName, setProductName] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState(null)
    const handleModalBackGroundClick = (e) => {
        e.stopPropagation()
        setOpenModal(false)
    }
    const fetchData = async () => {
        console.log(id);
        if(content ==="Product"){
            const getSingleData = await axios.get(`http://localhost:5000/api/${content}/get${content}/${id}`);
            setProductName(getSingleData.data.result.productName);
            setCategoryName(getSingleData.data.result.categoryName);
            const getAllCategories = await axios.get(`http://localhost:5000/api/category/getAllCategories`);
            console.log(getAllCategories);
            setCategories(getAllCategories.data.result)
        }else{
            const getSingleData = await axios.get(`http://localhost:5000/api/${content}/get${content}/${id}`);
            console.log(getSingleData);
            setCategoryName(getSingleData.data.result.categoryName);
        }

    }
    useEffect(() => {
        fetchData().catch(err => { console.log(err) })
    }, [])

    const productUpdateHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/${content}/update`, {
                productName,
                categoryName,
                productId: id
            })

            updateRecord()

        } catch (err) {
            console.log(err.response.data.message);
            setError(err.response.data.message);
        }

    }

    const categoryUpdateHandler = async (e) =>{
        e.preventDefault();
        try {
            const updateDetails = await axios.put(`http://localhost:5000/api/${content}/update`, {
                categoryName,
                Id:id
            })

            updateRecord()

        } catch (err) {
            console.log(err.response.data.message);
            setError(err.response.data.message);
        }
    }

    return (
        <div className={styles.innerModalBackGround} onClick={(e) => handleModalBackGroundClick(e)}>
            <div className={styles.billDetailsModal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.HeaderContainer}>
                    <h4>Update {content}</h4>
                </div>
                {content === "Product" && <><form className={styles.form} onSubmit={productUpdateHandler} action="post" >
                    <div className={styles.fieldWrapper}>

                        <label htmlFor="productName">Product Name:</label>
                        <input id="productName" type="text" required value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className={styles.fieldWrapper}>
                        <label htmlFor='category' />
                        Select Category:
                        <select
                            name="category"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                            className={styles.formSelect}
                        >
                            <option >{categoryName}</option>
                            {categories.map((category) => (
                                <option id={category.Id} key={category.Id}>{category.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button}>Update Product</button>
                    </div>

                </form>
                    <div>
                        {error && <p className={styles.errorMessage}>{error}</p>}
                    </div>
                </>
                }

                {
                    content === "Category" && <><form className={styles.form} onSubmit={categoryUpdateHandler}>
                        <label htmlFor="categoryName">Category Name</label>
                        <input id="categoryName" type="text" required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        <div className={styles.buttonContainer}>
                            <button className={styles.button}>Update Product</button>
                        </div>
                    </form>

                        <div>

                            {error && <p className={styles.errorMessage}>{error}</p>}
                        </div>
                    </>


                }

            </div>
        </div>
    )
}

export default UpdateModal