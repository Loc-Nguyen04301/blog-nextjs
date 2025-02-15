export const formatTimeMusic = (time: number | undefined): string => {
    if (typeof time === "number" && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formatMinutes = minutes.toString().padStart(2, "0");
        const formatSeconds = seconds.toString().padStart(2, "0");
        return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
};