import React from "react";
import blogService from "../../services/blog/blog.service";
import { toast } from "react-toastify";
const AdminConfirm = ({ item }) => {
  const adminConfirmYes = () => {
    blogService
      .adminConfirm(item._id, `yes`)
      .then((res) => toast(res.data.message));
  };
  const adminConfirmNo = () => {
    blogService
      .adminConfirm(item._id, `no`)
      .then((res) => toast(res.data.message));
  };
  return (
    <div className="row p-2 gap-1 m-1">
      <label htmlFor="confirm">Admin confirm</label>
      <button onClick={() => adminConfirmYes()} className="btn5 w-100">
        Yes
      </button>
      <button onClick={() => adminConfirmNo()} className="btn5 w-100">
        No
      </button>
    </div>
  );
};
export default AdminConfirm;
