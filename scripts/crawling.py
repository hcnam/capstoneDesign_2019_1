import requests
from bs4 import BeautifulSoup
f = open("D:\Dev\capstone\Avengers:Endgame.txt", 'w')
test_url = 'https://movie.naver.com/movie/bi/mi/pointWriteFormList.nhn?code=136900&type=after&isActualPointWriteExecute=false&isMileageSubscriptionAlready=false&isMileageSubscriptionReject=false'
resp = requests.get(test_url)
html = BeautifulSoup(resp.content, 'html.parser')
result = html.find('div', {'class':'score_total'}).find('strong').findChildren('em')[1].getText()
total_count = int(result.replace(',', ''))

def get_data(url):
    resp = requests.get(url)
    html = BeautifulSoup(resp.content, 'html.parser')
    score_result = html.find('div', {'class': 'score_result'})
    lis = score_result.findAll('li')
    for li in lis:                
        review_text = li.find('p').getText()
        score = li.find('em').getText()
        btn_likes = li.find('div', {'class': 'btn_area'}).findAll('span')
        watch_movie = li.find('span', {'class':'ico_viewer'})
        
        # 간단하게 프린트만 했습니다.
        f.write(score, review_text)

for i in range(1, int(total_count / 10) + 1):
    url = test_url + '&page=' + str(i)
    get_data(url)

f.close()