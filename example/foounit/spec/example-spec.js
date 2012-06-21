// require your source here

describe('this is a group', function (){
  var foo;

  before(function (){
    foo = { bar: 123 };
  });

  it('fails', function (){
    expect(foo.baz).toNot(beFalsy);
  });

  it('passes', function (){
    expect(foo.bar).to(be, 123);
  });

});

describe('this is a second group', function (){
  var foo;

  before(function (){
    foo = { bar: 123 };
  });

  it('Is supposed to failzor', function (){
    expect(foo.baz).toNot(beFalsy);
  });

  it('Is supposed to roxxor', function (){
    expect(foo.bar).to(be, 123);
  });

});

