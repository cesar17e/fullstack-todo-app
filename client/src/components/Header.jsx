function Header({ todos }) {
    const openCount = todos.length;
  
    return (
      <header>
        <h1 className="text-gradient">
          {openCount === 1
            ? "You have 1 open task."
            : `You have ${openCount} open tasks.`}
        </h1>
      </header>
    );
  }
  
  export default Header;
  