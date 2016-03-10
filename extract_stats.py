#!/usr/bin/python

import sys
import re

from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from cStringIO import StringIO


"""Some statistics on the German educational system.
Extracted from PDF files from the DAAD website:
https://www.daad.de/der-daad/zahlen-und-fakten/de/29877-daad-bundeslaenderstatistiken
"""

#PDF text extractor
def convert_pdf_to_txt(path):
    rsrcmgr = PDFResourceManager()
    retstr = StringIO()
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
    fp = file(path, 'rb')
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    password = ""
    maxpages = 0
    caching = True
    pagenos=set()
    for page in PDFPage.get_pages(fp, pagenos, maxpages=maxpages,password=password,caching=caching, check_extractable=True):

        interpreter.process_page(page)

    text = retstr.getvalue()

    fp.close()
    device.close()
    retstr.close()
    return text


  
def main():
  args = sys.argv[1:]

  if not args:
    print 'usage: python extract_stats.py file [file ...]'
    sys.exit(1)

  f = open('summary.txt', 'w')

  # For each filename get the stats
  for filename in args:

      #grab text from PDF file
      text_org = convert_pdf_to_txt(filename)

      #grab name of Federal State from PDF header
      temp = re.search('([\w.-]+)\s+Deutschland', text_org)
      state = temp.group(1)
      print state

      #remove letters
      text_wo_letters = re.sub(r'[a-zA-Z]', r'', text_org)
      
      #remove percent symbols
      text_wo_perc = re.sub(r'%', r'', text_wo_letters)
      
      #convert German number format to US format
      text_wo_frac = re.sub(r'[0-9]+,[0-9]+', r'', text_wo_perc)
      text = re.sub(r'\.', r'', text_wo_frac)
      
      #extract the quantities
      temp = re.search('([\w.-]+)\s+80523800', text)
      inhabitants = temp.group(1)
      temp = re.search('([\w.-]+)\s+2399409', text)
      students = temp.group(1)
      temp = re.search('([\w.-]+)\s+495088', text)
      freshmen = temp.group(1)
      temp = re.search('([\w.-]+)\s+413338', text)
      degrees = temp.group(1)
      temp = re.search('([\w.-]+)\s+353690', text)
      employees = temp.group(1)
      temp = re.search('([\w.-]+)\s+43862', text)
      professors = temp.group(1)
      temp = re.search('([\w.-]+)\s+204644', text)
      foreign_students = temp.group(1)
      temp = re.search('([\w.-]+)\s+79537', text)
      foreign_freshmen = temp.group(1)
      temp = re.search('([\w.-]+)\s+30806', text)
      foreign_degrees = temp.group(1)
      temp = re.search('([\w.-]+)\s+35345', text)
      foreign_employees = temp.group(1)
      temp = re.search('([\w.-]+)\s+2778', text)
      foreign_professors = temp.group(1)
      
      #write to stdout and file
      print state, inhabitants, students, freshmen, degrees, employees, professors, foreign_students, foreign_freshmen, foreign_degrees, foreign_employees, foreign_professors
      f.write(state+'\t'+inhabitants+'\t'+students+'\t'+freshmen+'\t'+degrees+'\t'+employees+'\t'+professors+'\t'+foreign_students+'\t'+foreign_freshmen+'\t'+foreign_degrees+'\t'+foreign_employees+'\t'+foreign_professors+'\n')

  f.close()



            
if __name__ == '__main__':
  main()
