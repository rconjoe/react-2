function Main() {

  let names = ['joe', 'ben', 'alex'];

  function changeName() {
    return names[0] = 'bob';
  }

  return (
    <div>
      <div>a bunch of</div>
      <div>unrelated content</div>
      {
        names.map((name) => {
          return <div>{name}</div>
        })
      }
      <button click={changeName}>click me</button>
    </div>
  );

}

export default Main;
