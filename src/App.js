import React, { useState, useEffect } from "react";
import WorkflowListPage from "./components/WorkflowListPage";
import WorkflowDesignerPage from "./components/WorkflowDesignerPage";

function App() {
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [modules, setModules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    
    fetch("https://64307b10d4518cfb0e50e555.mockapi.io/workflow")
      .then((response) => response.json())
      .then((data) => {
        setWorkflows(data);
      })
      .catch((error) => {
        console.error("Error loading workflows:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedWorkflow) {
      
      fetch(`https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${selectedWorkflow.id}`)
        .then((response) => response.json())
        .then((data) => {
         
          setSelectedWorkflow({ ...selectedWorkflow, name: data.name });

          
          const inputNode = {
            id: "input",
            name: "Input",
            inputType: data.inputType,
            outputType: "",
            x: 100,
            y: 100,
          };
          setModules([inputNode, ...data.modules]);
        })
        .catch((error) => {
          console.error("Error loading workflow:", error);
        });
    }
  }, [selectedWorkflow]);

  useEffect(() => {
    
    fetch("https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=5")
  .then((response) => response.json())
  .then((data) => {
    if (Array.isArray(data.modules)) { 
      setModules((prevModules) => [...prevModules, ...data.modules]);
    } else {
      console.error('data.modules is not an array');
    }
  })
  .catch((error) => {
    console.error('Error fetching modules:', error);
  });

  }, [currentPage]);

  const handleWorkflowSelect = (workflow) => {
    setSelectedWorkflow(workflow);
  };

  const handleModuleDrag = (module, x, y) => {
    
    setModules((prevModules) =>
      prevModules.map((m) => (m.id === module.id ? { ...m, x, y } : m))
    );
  };

  const handleModuleDelete = (module) => {
   
    setModules((prevModules) => prevModules.filter((m) => m.id !== module.id));
  };

  return (
    <div className="App">
      <WorkflowListPage workflows={workflows} onSelect={handleWorkflowSelect} />
      {selectedWorkflow && (
        <WorkflowDesignerPage
          workflow={selectedWorkflow}
          modules={modules}
          onModuleDrag={handleModuleDrag}
          onModuleDelete={handleModuleDelete}
        />
      )}
      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App
