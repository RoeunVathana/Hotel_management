import { useState, useEffect } from "react";
import "./employees.css";
import LightMode from "../DartMode/LightMode";
import { Modal, Form, Input, Button, Space, Row, Col, InputNumber, Select } from "antd";
import Request from "../../util/Request";
import { alertSuccess, alertError, confirmDelete } from "../../../swertalert/AlertSuccess";
import { useNavigate } from "react-router";
import { getStoreUser } from "../../localStorage/userStore";

const Employees = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getStoreUser()) {
      navigate("/login");
    }
    console.log("User: ", getStoreUser());
  }, [navigate]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const query = searchKeyword.trim().toLowerCase();
  const filteredRooms = data.filter((item) =>
    !query ||
    item.name?.toLowerCase().includes(query) ||
    item.position?.toLowerCase().includes(query) ||
    item.phone?.toLowerCase().includes(query),
  );

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRooms = filteredRooms.slice(startIndex, endIndex);


  // Fetch Employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await Request("/api/employee", "get");
      if (res) {
        const list = res.data || [];
        console.log(res);
        setData(list);
      }
    } catch (error) {
      alertError({
        title: "Error",
        text: error?.response?.data?.message || "Failed to load Employees.",
      });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchEmployees();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleAddNew = () => {
    setEditingId(null);
    form.resetFields();
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    form.setFieldsValue({
      room_id: item.room_id,
      name: item.name,
      position: item.position,
      gender: item.gender,
      age: item.age,
      phone: item.phone,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const ok = await confirmDelete(async () => {
        await Request(`/api/Employees/${id}`, "delete");
      });
      if (ok) {
        fetchEmployees();
      }
    } catch (error) {
      alertError({
        title: "Error!",
        text: error?.response?.data?.message || "Failed to delete Employees.",
      });
    }
  };

  const onFinish = async (values) => {
    try {
      const url = editingId ? `/api/Employees/${editingId}` : "/api/Employees";
      const method = editingId ? "put" : "post";

      const data = {
        room_id: values.room_id || null,
        name: values.name,
        position: values.position,
        gender: values.gender,
        age: values.age,
        phone: values.phone,
      };

      const res = await Request(url, method, data);

      if (res) {
        setOpen(false);
        form.resetFields();
        setEditingId(null);
        alertSuccess({
          title: "Success!",
          text: editingId
            ? "Updated Employees successfully"
            : "Created Employees successfully",
        });
        fetchEmployees();
      }
    } catch (error) {
      alertError({
        title: "Error!",
        text: error?.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="dashboard">
      <LightMode title="Employees" />

      <div className="d-flex justify-content-end align-items-center mb-3">
        <Space>
          <Button type="primary" onClick={handleAddNew}>
            + Add New Employees
          </Button>
        </Space>
      </div>

      <div className="room-type-controls">
        <div className="items-per-page">
          <label>Show</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={3}>3</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={50}>50</option>
          </select>
          <span>items per page</span>
        </div>

        <div className="search-box">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search by name, position, or phone..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <table className="room-type-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Room ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRooms.length > 0 ? (
              paginatedRooms.map((Employees) => (
                <tr key={Employees.id}>
                  <td>{Employees.id}</td>
                  <td>{Employees.name || "-"}</td>
                  <td>{Employees.position || "-"}</td>
                  <td>{Employees.gender || "-"}</td>
                  <td>{Employees.age || "-"}</td>
                  <td>{Employees.phone || "-"}</td>
                  <td>{Employees?.room?.room_number || "-"}</td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(Employees)}
                    >
                      ✎ Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(Employees.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="no-data"
                >
                  <span style={{ display: "flex", justifyContent: "center"}}>No items found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="pagination-info">
        Showing {filteredRooms.length > 0 ? startIndex + 1 : 0} to{" "}
        {Math.min(endIndex, filteredRooms.length)} of {filteredRooms.length}{" "}
        items
      </div>

      <div className="pagination-controls">
        <button
          className="btn-pagination"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="page-numbers">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          className="btn-pagination"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Modal
        title={editingId ? "Edit Employees" : "Add New Employees"}
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
          setEditingId(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter name" }]}>
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Position" name="position" rules={[{ required: true, message: "Please enter position" }]}>
                <Input placeholder="Enter position" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Gender" name="gender">
                <Input placeholder="Enter gender" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Age" name="age">
                <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter age" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Please enter phone" }]}>
                <Input placeholder="Enter phone" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                danger
                onClick={() => {
                  setOpen(false);
                  form.resetFields();
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>

              <Button type="primary" htmlType="submit">
                {editingId ? "Update" : "Save"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employees;