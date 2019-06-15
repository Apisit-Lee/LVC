export function updateTree(source, target, keys=['checked']) {
  iterateHandler(source, target);

  function iterateHandler(source, target) {
    return source.map(branch => {
      if (branch.key === target.key) {
        keys.map(key => {
          branch[key] = target[key];
        });
      } else {
        if (branch.children && branch.children.length) {
          branch.children = iterateHandler(branch.children, target);
        }
      }
      return branch;
    });
  }
}

export function getData(source = [], opt) {
  const defaultOpt = {
    keyOnly: true,
    checkedOnly: true
  };
  opt = {
    ...defaultOpt,
    ...opt
  };

  function handleBranches(source = [], {keyOnly = true, checkedOnly = true}) {
    const res = [];

    source.map(branch => {
      handleBranch(branch, {keyOnly, checkedOnly});
    });

    function handleBranch(branch, {keyOnly = true, checkedOnly = true}) {
      checkedOnly
        ? branch.checked && res.push(keyOnly ? branch.key : branch)
        : res.push(keyOnly ? branch.key : branch);

      if (branch.children) {
        branch.children.map(cBranch => {
          handleBranch(cBranch, {keyOnly, checkedOnly});
        });
      }
    }

    return res;
  }

  return handleBranches(source, opt);
}
