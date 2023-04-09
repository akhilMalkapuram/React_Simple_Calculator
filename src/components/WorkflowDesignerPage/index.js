import React, { useEffect, useState } from 'react';

function WorkflowDesignerPage(props) {
  const [workflow, setWorkflow] = useState({});
  const [modules, setModules] = useState([]);
  const [canvasNodes, setCanvasNodes] = useState([]);

  const workflowId = props.match.params.id;

  useEffect(() => {
    async function fetchWorkflow() {
      const response = await fetch(`https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${workflowId}`);
      const data = await response.json();
      setWorkflow(data);
      setCanvasNodes([{ type: 'input', name: 'Input', inputType: data.inputType }]);
    }
    fetchWorkflow();
  }, [workflowId]);

  useEffect(() => {
    async function fetchModules() {
      const response = await fetch("https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=5");
      const data = await response.json();
      setModules(data);
    }
    fetchModules();
  }, []);

  function handleModuleDragStart(e, module) {
    e.dataTransfer.setData('module', JSON.stringify(module));
  }

  function handleCanvasDrop(e) {
    e.preventDefault();
    const module = JSON.parse(e.dataTransfer.getData('module'));
    const newNode = { type: 'module', ...module };
    setCanvasNodes([...canvasNodes, newNode]);
  }

  function handleCanvasNodeDelete(nodeIndex) {
    const newNodes = canvasNodes.filter((node, i) => i !== nodeIndex);
    setCanvasNodes(newNodes);
  }

  function handleCanvasNodeInput(nodeIndex, input) {
    const newNodes = [...canvasNodes];
    newNodes[nodeIndex].input = input;
    setCanvasNodes(newNodes);
  }

  function isNodeValid(node) {
    if (node.type === 'input') return true;
    return !!node.input;
  }

  return (
    <div>
      <h1>{workflow.name}</h1>
      <div
        onDrop={handleCanvasDrop}
        onDragOver={e => e.preventDefault()}
      >
        {canvasNodes.map((node, i) => (
          <div
            key={i}
            style={{ border: isNodeValid(node) ? '1px solid black' : '1px solid red' }}
          >
            <span>{node.name}</span>
            {node.type !== 'input' && (
              <input
                type="text"
                value={node.input || ''}
                onChange={e => handleCanvasNodeInput(i, e.target.value)}
              />
            )}
            <button onClick={() => handleCanvasNodeDelete(i)}>Delete</button>
          </div>
        ))}
      </div>
      <ul>
        {modules.map(module => (
          <li
            key={module.id}
            draggable
            onDragStart={e => handleModuleDragStart(e, module)}
          >
            {module.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkflowDesignerPage;
