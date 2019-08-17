
export const isPangram = (text) => {
  // I did not use arrays [as test file expects] because I assumed using objects improves speed
  const alphabet = {
    q:0,
    w:0,
    e:0,
    r:0,
    t:0,
    y:0,
    u:0,
    i:0,
    o:0,
    p:0,
    a:0,
    s:0,
    d:0,
    f:0,
    g:0,
    h:0,
    j:0,
    k:0,
    l:0,
    z:0,
    x:0,
    c:0,
    v:0,
    b:0,
    n:0,
    m:0
  }

  for (let i=0;i<text.length;i++) {
    if (text.substring(i, i + 1) != ' ') alphabet[text.substring(i, i + 1).toLowerCase()] 
        = alphabet[text.substring(i, i + 1).toLowerCase()] + 1;
  }
  
  const letters = Object.keys(alphabet);
  let allUsed = true;
  for (let i=0; i<letters.length; i++) {
    if (!alphabet[letters[i]].isNaN && alphabet[letters[i]] == 0) {
      allUsed = false;
      break;
    }
  }
  
  return allUsed;
};
