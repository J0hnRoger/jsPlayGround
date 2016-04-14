 describe('#MathsLib', function () {
   it('#Add should return the sum', function () {
     var sum = MathsLib.add(45, 80);
     expect(sum).to.be.equal(125);
   });
 });
