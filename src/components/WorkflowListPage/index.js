import React, { useEffect, useState } from 'react';
import "./index.css"
function WorkflowListPage() {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    async function fetchWorkflows() {
      const response = await fetch('https://64307b10d4518cfb0e50e555.mockapi.io/workflow');
      const data = await response.json();
      setWorkflows(data);
    }
    fetchWorkflows();
  }, []);

  return (
    <div>
      <h1>Workflow List Page</h1>
      <hr/>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>InputType</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
        {workflows.map(workflow => (
          <tr key={workflow.id}>
          <td><a href={`/workflow-designer/${workflow.id}`}>{workflow.name}</a></td>
          <td>{workflow.input_type}</td>
          <td>{workflow.createdAt}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkflowListPage;
