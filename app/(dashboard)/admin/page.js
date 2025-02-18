"use client";
import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const Dashboard = () => {
    const [totals, setTotals] = useState({
        totalEarnings: 0,
        pending: 0,
        inReview: 0,
    });

    const revenueChartRef = useRef(null);
    const userStatChartRef = useRef(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await fetch("/api/transactions");
                const data = await res.json();

                setTotals({
                    totalEarnings: data.totalEarnings || 0,
                    pending: data.pending || 0,
                    inReview: data.inReview || 0,
                });
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    useEffect(() => {
        const revenueCanvas = document.getElementById("revenue");
        const userStatCanvas = document.getElementById("userstat");

        if (revenueChartRef.current) {
            revenueChartRef.current.destroy(); // Destroy existing instance
        }
        if (userStatChartRef.current) {
            userStatChartRef.current.destroy(); // Destroy existing instance
        }

        if (revenueCanvas) {
            const revenueCtx = revenueCanvas.getContext("2d");
            revenueChartRef.current = new Chart(revenueCtx, {
                type: "bar",
                data: {
                    labels: ["Jan", "Feb", "March", "Apr", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        backgroundColor: [
                            "#CCEABB", "#FDCB9E", "#CCEABB", "#FDCB9E", "#CCEABB", "#FDCB9E", "#CCEABB", "#FDCB9E", "#CCEABB", "#FDCB9E", "#CCEABB"
                        ],
                        data: [55, 49, 44, 24, 15, 55, 49, 44, 24, 15, 14]
                    }]
                },
                options: {
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        if (userStatCanvas) {
            const userStatCtx = userStatCanvas.getContext("2d");
            userStatChartRef.current = new Chart(userStatCtx, {
                type: "doughnut",
                data: {
                    labels: ["Male", "Female"],
                    datasets: [{
                        backgroundColor: ["#CCEABB", "#FDCB9E"],
                        data: [65, 40]
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true
                        }
                    }
                }
            });
        }

        return () => {
            if (revenueChartRef.current) {
                revenueChartRef.current.destroy();
            }
            if (userStatChartRef.current) {
                userStatChartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="row">
            <div className="col-md-8">
                <div className="row mb-3">
                    {["Total Registered Users", "Active Users", "Matches Users"].map((title, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card shadow-sm border-0 p-2 mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3">
                                        <i className={`bi bi-${index === 2 ? "person-check" : "people"} fs-3`}></i>
                                        <span className="fs-3 fw-semibold text-green">1,234</span>
                                    </div>
                                    <h6 className="mb-1 text-black">{title}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row mb-3">
                    <canvas id="revenue" style={{ width: "100%" }}></canvas>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card bg-light border-0 shadow-sm p-4 rounded-5 border-bottom border-5 border-danger">
                    <h5 className="mb-4 fs-4">Your Earnings</h5>
                    <div className="row">
                        {["Total Earning", "Pending", "In Review"].map((label, index) => {
                            const value = index === 0 ? totals.totalEarnings : index === 1 ? totals.pending : totals.inReview;
                            return (
                                <div key={index} className="col-4 text-muted fw-light">
                                    <p className="text-muted fw-light fs-12">
                                        {label} <br />
                                        <span className={`fs-16 ${index === 0 ? "color-maroon" : "text-black"}`}>
                                            ${value}
                                        </span>
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h4 className="fw-medium fs-22 py-4">Top Cities</h4>
                        <div>
                            {[
                                { name: "Indonesia", percentage: 75 },
                                { name: "Indonesia", percentage: 50 },
                                { name: "Indonesia", percentage: 30 },
                            ].map((city, index) => (
                                <div
                                    key={index}
                                    className="progress bg-fff align-middle my-4"
                                    role="progressbar"
                                    style={{ height: "30px" }}
                                    aria-valuenow={city.percentage}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <div className="bg-green-linear py-1 rounded-3" style={{ width: `${city.percentage}%` }}>
                                        <span>{`${city.name} - ${city.percentage}%`}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h4 className="fw-medium fs-22 py-4">User Stats</h4>
                        <canvas id="userstat" style={{ width: "100%", maxWidth: "250px" }}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
