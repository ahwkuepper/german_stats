#!/usr/bin/python

import sys
import re

"""Some statistics on the German educational system.
Extracted from pdf files from the DAAD website:
https://www.daad.de/der-daad/zahlen-und-fakten/de/29877-daad-bundeslaenderstatistiken
"""


def main():
  args = sys.argv[1:]

  if not args:
    print 'usage: python germanstats.py file [file ...]'
    sys.exit(1)

  # For each filename, get the stats
  for filename in args:
      print filename
      f = open(filename+'.summary.txt', 'w')
      f.close()



            
if __name__ == '__main__':
  main()
