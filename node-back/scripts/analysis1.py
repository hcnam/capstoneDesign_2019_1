from konlpy.tag import *
import sys

sentence = sys.argv[1].replace('_',' ')

hannanum = Hannanum()
kkma = Kkma()
Okt = Okt()

for i in hannanum.nouns(sentence):
    print(i)
