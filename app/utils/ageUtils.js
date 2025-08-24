export function calculateAge(birthdate) {
  const birth = new Date(birthdate);
  const today = new Date();
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

export function getNextBirthday(birthdate) {
  const birth = new Date(birthdate);
  const today = new Date();
  const currentYear = today.getFullYear();
  
  let nextBirthday = new Date(currentYear, birth.getMonth(), birth.getDate());
  
  if (nextBirthday < today) {
    nextBirthday = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
  }
  
  return nextBirthday;
}

export function getDaysUntilBirthday(birthdate) {
  const nextBirthday = getNextBirthday(birthdate);
  const today = new Date();
  const diffTime = Math.abs(nextBirthday - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}