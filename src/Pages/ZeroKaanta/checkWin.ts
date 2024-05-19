export default function checkWin(filledArray: (" " | "O" | "X")[]) {
	function areEqual(n1: number, n2: number, n3: number) {
		if (filledArray[n1] === " ") return false;
		if (
			filledArray[n1] === filledArray[n2] &&
			filledArray[n2] === filledArray[n3] &&
			filledArray[n3] === filledArray[n1]
		) {
			return true;
		}
	}
	if (
		areEqual(0, 1, 2) ||
		areEqual(3, 4, 5) ||
		areEqual(6, 7, 8) ||
		//
		areEqual(0, 3, 6) ||
		areEqual(1, 4, 7) ||
		areEqual(2, 5, 8) ||
		//
		areEqual(0, 4, 8) ||
		areEqual(2, 4, 6)
	)
		return true;
	return false;
}
