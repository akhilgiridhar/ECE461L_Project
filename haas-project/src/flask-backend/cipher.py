def encrypt(inputText, N, D):
    # Check if N is valid
    if N < 1:
        raise ValueError("N must be greater than or equal to 1")

    # Check if D is valid
    if D not in [-1, 1]:
        raise ValueError("D must be -1 (shift left) or 1 (shift right)")

    printableChars = [chr(i) for i in range(34, 127)]
    reversedText = inputText[::-1]
    encryptedText = ""
    for char in reversedText:
        if char in printableChars:
            # if the character is in printableChars list, then shift it
            charIndex = printableChars.index(char)
            shiftedIndex = (charIndex + (N * D)) % len(printableChars)
            encryptedText += printableChars[shiftedIndex]
        else:
            # if the character is not in the printableChars list, keep it unchanged
            encryptedText += char

    return encryptedText


def decrypt(encryptedText, N, D):
    # Check if N is valid
    if N < 1:
        raise ValueError("N must be greater than or equal to 1")

    # Check if D is valid
    if D not in [-1, 1]:
        raise ValueError("D must be -1 (shift left) or 1 (shift right)")

    printableChars = [chr(i) for i in range(34, 127)]
    decryptedText = ""

    for char in encryptedText:
        if char in printableChars:
            # if the character is in printableChars list, then reverse the shift
            charIndex = printableChars.index(char)
            reversedIndex = (charIndex - (N * D)) % len(printableChars)
            decryptedText += printableChars[reversedIndex]
        else:
            # if the character is not in the printableChars list, keep it unchanged
            decryptedText += char

    # Reverse the decrypted text to get the original input text
    originalText = decryptedText[::-1]

    return originalText