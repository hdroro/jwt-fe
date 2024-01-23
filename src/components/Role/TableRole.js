import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { deleteRole, fetchAllRoles } from "../../services/roleService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalDelete, setShowModalDelete] = useState(false);
  const [isShowModalEdit, setShowModalEdit] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    fetchAllRole();
  }, [currentPage, isShowModalEdit]);

  useImperativeHandle(ref, () => ({
    fetchListRolesAgain() {
      fetchAllRole();
    },
  }));

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const fetchAllRole = async () => {
    let response = await fetchAllRoles(currentPage, currentLimit);
    if (response && response.EC === 0) {
      setListRoles(response.DT.roles);
      setTotalPages(response.DT.totalPages);
      console.log(response.DT);
    }
  };

  const handleDeleteRole = async (role) => {
    setDataModal(role);
    setShowModalDelete(true);
  };

  const handleUpdateRole = (role) => {
    setShowModalEdit(true);
    setDataModal(role);
  };

  const handleClose = () => {
    setShowModalDelete(false);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };

  const handleConfirmDelete = async () => {
    let data = await deleteRole(dataModal.id);
    console.log("data", data);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      await fetchAllRole();
      setShowModalDelete(false);
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Id</th>
            <th scope="col">Url</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listRoles &&
            listRoles.length &&
            listRoles.map((item, index) => (
              <tr key={index}>
                <th scope="row">
                  {(currentPage - 1) * currentLimit + index + 1}
                </th>
                <td>{item.id}</td>
                <td>{item.url}</td>
                <td>{item.description}</td>
                <td style={{ display: "flex", gap: "5px" }}>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleUpdateRole(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteRole(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {totalPages > 0 && (
        <div className="user-footer">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            marginPagesDisplayed={3}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      )}

      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
      />

      <ModalEdit
        isShowModalEdit={isShowModalEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        dataModel={dataModal}
      />
    </>
  );
});

export default TableRole;
