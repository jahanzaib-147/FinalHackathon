import { useState, useEffect } from "react";

const Dashboard = () => {
  const [loans, setLoans] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("id");

  // Fetching loans and user data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.159.92:5000/api/admin/applications", {
          method: "GET",
          redirect: "follow",
        });
        const result = await response.json();
        if (response.ok) {
          setLoans(result);
          setUser(result.userId); // Assuming user information is part of the loan data
        } else {
          alert("Failed to fetch loan data.");
        }
      } catch (error) {
        console.error("Error fetching loan data:", error);
        alert("An error occurred while fetching the loan data.");
      }
    };

    fetchData();
  }, []);

  // Filter and Sort Logic
  const filteredLoans = loans.filter((loan) =>
    loan.category.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedLoans = [...filteredLoans].sort((a, b) => {
    if (sort === "amount") {
      return parseInt(b.amount.replace(/,/g, "")) - parseInt(a.amount.replace(/,/g, ""));
    }
    if (sort === "status") {
      return a.status.localeCompare(b.status);
    }
    return a.id - b.id; // Default sort by ID
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white py-4 mb-6">
        <h1 className="text-3xl font-bold text-center">User Dashboard</h1>
      </header>

      {/* User Information */}
      {user && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">User Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>CNIC:</strong> {user.cnic}</p>
          <p><strong>Appointment Date:</strong> {user.appointmentDetails?.date}</p>
          <p><strong>Appointment Time:</strong> {user.appointmentDetails?.time}</p>
          <p><strong>Appointment Location:</strong> {user.appointmentDetails?.location}</p>
          <div>
            <strong>Guarantors:</strong>
            <ul>
              {user.guarantors?.map((guarantor) => (
                <li key={guarantor._id}>
                  {guarantor.name} - {guarantor.email}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Loan Applications</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search by Category"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border p-2 rounded"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="id">Sort by ID</option>
              <option value="amount">Sort by Amount</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>

        {/* Loans Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Subcategory</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {sortedLoans.length > 0 ? (
              sortedLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{loan.id}</td>
                  <td className="border border-gray-300 p-2">{loan.category}</td>
                  <td className="border border-gray-300 p-2">{loan.subcategory}</td>
                  <td className="border border-gray-300 p-2">PKR {loan.amount}</td>
                  <td
                    className={`border border-gray-300 p-2 text-center ${
                      loan.status === "Approved"
                        ? "text-green-600 font-bold"
                        : loan.status === "Pending"
                        ? "text-yellow-600 font-bold"
                        : "text-red-600 font-bold"
                    }`}
                  >
                    {loan.status}
                  </td>
                  <td className="border border-gray-300 p-2">{loan.submittedAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">No loans found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
