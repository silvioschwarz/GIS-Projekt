#! /bin/sh

for FILE in *.pdf
 do
  gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="new_$FILE" "$FILE"
  rm "$FILE"
  mv "new_$FILE" "$FILE"
done

#    -dPDFSETTINGS=/screen lower quality, smaller size. (72 dpi)
#    -dPDFSETTINGS=/ebook for better quality, but slightly larger pdfs. (150 dpi)
#    -dPDFSETTINGS=/prepress output similar to Acrobat Distiller "Prepress Optimized" setting (300 dpi)
#    -dPDFSETTINGS=/printer selects output similar to the Acrobat Distiller "Print Optimized" setting (300 dpi)
#    -dPDFSETTINGS=/default selects output intended to be useful across a wide variety of uses, possibly at the expense of a larger output file


