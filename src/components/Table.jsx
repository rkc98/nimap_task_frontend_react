import React, { useMemo, useState } from 'react'
import Pagination from './pagination/Pagination';

import styles from './Table.module.css'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios';

const PageSize = 10;
const Table = (props) => {
    const { tableHeaders, tableValues, totalCount, setTableValues, currentPage, setCurrentPage, fetchData, content, setOpenModal,setId } = props;

    // // Pagination
    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return tableValues.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage, tableValues]);


    const handleEdit = (id) => {
        setId(id)
        setOpenModal(true)
    }

    const handleDelete = async (id) => {
        console.log(id);
        const result = await axios.delete(`http://localhost:5000/api/${content}/delete/${id}`);
        const filteredData = tableValues.filter(item => item.Id !== id);
        setTableValues([...filteredData]);
        fetchData(PageSize, PageSize * (currentPage - 1));
    }

    return (
        <div className={styles.mainContainer}>
            <table className={styles.rwdtable}>
                <tr>
                    {tableHeaders.map(item => <th>{item}</th>)}
                    <th>Actions</th>
                </tr>
                {tableValues.map(item => <tr key={item.Id}>
                    {tableHeaders.map((header) => <td>{item[header]}</td>)}
                    <td>
                        <FaEdit className={styles.editIcons} onClick={() => handleEdit(item.productId?item.productId:item.Id)} />
                        <AiFillDelete className={styles.deleteIcons} onClick={() => handleDelete(item.productId?item.productId:item.Id)} />
                    </td>
                </tr>)}

            </table>
            <Pagination
                className={styles.paginationBar}
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={PageSize}
                onPageChange={setCurrentPage}
                fetchData={fetchData}
            />
        </div>
    )
}

export default Table