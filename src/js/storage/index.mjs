export function storageSave(theKey, storageValue) {
  localStorage.setItem(theKey, JSON.stringify(storageValue));
}

export function save(theKey, storageValue) {
  localStorage.setItem(theKey, JSON.stringify(storageValue));
}

export function load(theKey) {
  try {
    const storageValue = localStorage.getItem(theKey);
    return JSON.parse(storageValue);
  } catch {
    return null;
  }
}

export function remove(theKey) {
  localStorage.removeItem(theKey);
}
