export function formatNumber(amount: number): string {
    return amount?.toLocaleString("en-US",{
        maximumFractionDigits: 0,
    });
}
export function getInitials(name:string): string {
    const words= name.trim().split(" ");
    const firstTwoWords =words.slice(0,2);
    const initials = firstTwoWords.map((word)=> word.charAt(0).toUpperCase());
    return initials.join(" ");
}
export function formatDateTime(isoDate:string):string {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions={
        weekday:"short",
        year:"numeric",
        month:"short",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
        second:"numeric",
    };
 
return date.toLocaleString("en-US",options);
}
export function CalculateAge(dob: Date): string {
    const today = new Date();
    let years= today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    if( months< 0){
        years--;
        months+=12;
    }
    if(months ===0 && today.getDate()< dob.getDate()){
        years--;
        months=11;
    }
    if( years ===0){
        return `${months} months`;
    }
    let ageString ='${years} years';
    if(months>0){
        ageString += `${months} months`;
    }
    return ageString+ " old";
  
}
export const daysOfweek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];
