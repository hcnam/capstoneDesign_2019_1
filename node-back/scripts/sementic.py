import konlpy
from konlpy.tag import Okt
import json
import os
import sys
from pprint import pprint
import nltk
import numpy as np
import tensorflow as tf
from tensorflow.keras import models
from tensorflow.keras import layers
from tensorflow.keras import optimizers
from tensorflow.keras import losses
from tensorflow.keras import metrics
from tensorflow.keras.models import load_model

# test = open('./tmp.txt', encoding='utf-8')
# comment=test.read()

def tokenize(doc):
    # norm은 정규화, stem은 근어로 표시하기를 나타냄
    return ['/'.join(t) for t in okt.pos(doc, norm=True, stem=True)]

if os.path.isfile('../datasets/train_docs.json'):
    with open('../datasets/train_docs.json', encoding='UTF8') as f:
        train_docs = json.load(f)
    with open('../datasets/test_docs.json', encoding='UTF8') as f:
        test_docs = json.load(f)
else:    
    pass
okt = Okt()
tokens = [t for d in train_docs for t in d[0]]    
text = nltk.Text(tokens, name='NMSC')
selected_words = [f[0] for f in text.vocab().most_common(4096)]

def term_frequency(doc):
    return [doc.count(word) for word in selected_words]


model = load_model('../sementic_model.h5')


def predict_pos_neg(review):
    token = tokenize(review)
    tf = term_frequency(token)
    data = np.expand_dims(np.asarray(tf).astype('float32'), axis=0)
    score = float(model.predict(data))
    print(str(score))
    #if(score > 0.5):
    #    print("[{}]는 {:.2f}% 확률로 긍정\n".format(review, score * 100))
    #else:
    #    print("[{}]는 {:.2f}% 확률로 부정;\n".format(review, (1 - score) * 100))

#predict_pos_neg("올해 최고의 영화! 세 번 넘게 봐도 질리지가 않네요.")
#predict_pos_neg("배경 음악이 영화의 분위기랑 너무 안 맞았습니다. 몰입에 방해가 됩니다.")
#predict_pos_neg("주연 배우가 신인인데 연기를 진짜 잘 하네요. 몰입감 ㅎㄷㄷ")
#predict_pos_neg("믿고 보는 감독이지만 이번에는 아니네요")
#predict_pos_neg("주연배우 때문에 봤어요")
#predict_pos_neg("그저그런것 같은데 이번꺼는 좀 아닌듯...")
comment = sys.argv[1].replace('_',' ')
predict_pos_neg(comment)