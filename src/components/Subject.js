import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const Subject = () => {
    const location = useLocation();
    const user = location.state?.user;
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState([]);
    const loadSubjects = async () => {
        const res = await axios.get("http://localhost:9000/subjects");
        // Lưu dữ liệu nhận được vào state employees
        setSubjects(res.data);
    };
    useEffect(() => {
        loadSubjects().catch(() =>
            setError({
                general: "Can not load data. Run json-server again!"
            })
        );
    }, []);
    const [searchKey, setSearchKey] = useState("");
    const filteredSubjects = subjects.filter((s) =>
        s.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    return (
        <>
            <div className="text-dark border" style={{ padding: "10px" }}>
                Hello, {user.email} ({user?.role})
            </div>
            <Container className="mt-4 d-flex justify-content-between">
                <h2>Danh sách môn học</h2>
                <div>
                    <button
                        className="btn btn-danger"
                        onClick={() => navigate('/login')}
                    >
                        Logout
                    </button>
                </div>
            </Container>
            <div className="row">
                <input
                    type="text"
                    placeholder="Tìm kiếm môn học"
                    style={{
                        margin: "auto", padding: 5,
                        border: "1px solid #e5e7eb"
                    }}
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
            </div>

            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>Mã môn</th>
                            <th style={{ textAlign: "left" }}>Tên môn học</th>
                            <th style={{ textAlign: "left" }}>Số lượng câu hỏi</th>
                            <th style={{ textAlign: "left" }}>Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubjects.map((s) => (
                            <tr>
                                <td>{s.id}</td>
                                <td>{s.name}</td>
                                <td>{s.questionsCount}</td>
                                <td>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </>
    );
};

export default Subject;