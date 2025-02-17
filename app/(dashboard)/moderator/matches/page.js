"use client"
import { useState } from "react";
import { BsPencil , BsFillTrash3Fill  } from "react-icons/bs";

const matches = [
  {
    matchId: "01",
    user1Id: "01",
    user2Id: "01",
    user1Name: "Theresa Webb",
    user2Name: "Theresa Webb",
    matchDate: "23/12/2024",
    lastInteraction: "23/12/2024",
  },
  
];

export default function MatchTable() {
  const [matchList, setMatchList] = useState(matches);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive bg-white p-3 rounded-4">
          <table className="table tablespace text-center">
            <thead className="align-items-center thead-bg">
              <tr>
                <th></th>
                <th>Match ID</th>
                <th>User 1 ID</th>
                <th>User 2 ID</th>
                <th>User 1 Name</th>
                <th>User 2 Name</th>
                <th>Match Date</th>
                <th>Last Interaction</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-grayer tbody-bg">
              {matchList.map((match, index) => (
                <tr key={index}>
                  <td><input type="checkbox" className="form-check-input" /></td>
                  <td>{match.matchId}</td>
                  <td>{match.user1Id}</td>
                  <td>{match.user2Id}</td>
                  <td>{match.user1Name}</td>
                  <td>{match.user2Name}</td>
                  <td>{match.matchDate}</td>
                  <td>{match.lastInteraction}</td>
                  <td className="text-center align-middle">
                    <div className="d-flex justify-content-center gap-1">
                      <a href="/matches-detail">
                        <button className="btn btn-sm" title="Edit">
                          <BsPencil />
                        </button>
                      </a>
                      <button className="btn btn-sm" title="Delete">
                        <BsFillTrash3Fill className="text-danger" />
                        
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
