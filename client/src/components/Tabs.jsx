function Tabs({ selectedTab, setSelectedTab, todos }) {

    const counts = {
      All: todos.length,
      Open: todos.filter(t => !t.completed).length,
      Complete: todos.filter(t => t.completed).length,
    };
  
    return (
      <nav className="tab-container">
        {["All", "Open", "Complete"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`tab-button ${selectedTab === tab ? "selected-tab" : ""}`}
          >
            <h4>
              {tab} <span>({counts[tab]})</span>
            </h4>
          </button>
        ))}
        <hr />
      </nav>
    );
  }
  
  export default Tabs;
  