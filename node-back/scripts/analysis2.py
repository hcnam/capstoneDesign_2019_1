import khaiii
import sys
api = khaiii.KhaiiiApi()
api.open()
# 대상 예문
sentence = sys.argv[1].replace('_',' ')
# 어절 별 구분
for word in api.analyze(sentence): 
    # 형태 별 구분
    
    for m in word.morphs:
        if (m.tag == 'NNG') or (m.tag == 'NNP'):
            print(m.lex)