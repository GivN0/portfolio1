from pyscript import document, when, display, window
#from pyscript import Element
#import spotipy
#from spotipy.oauth2 import SpotifyClientCredentials
#import cred
#import wikipedia as wiki
#from googleapiclient.discovery import build
#from pyweb import pydom
import difflib 
import time
#import webbrowser




#getting all elements 
input_text = document.querySelector("#search-bar")
txt = input_text.value

fulltapeBtn = document.querySelector(".fulltape-link")
mixtapetitle = document.querySelector(".mixtape-title")
interviewBtn = document.querySelector(".interview-link")
wikipediaBtn = document.querySelector(".wikipedia-link")
searchitem = document.querySelector(".search-container")

'''
fulltapeBtn = document.querySelectorAll(".fulltape-link")
mixtapetitle = document.querySelectorAll(".mixtape-title")
interviewBtn = document.querySelectorAll(".interview-link")
wikipediaBtn = document.querySelectorAll(".wikipedia-link")
searchitem = document.querySelectorAll(".search-container")
'''
mixtapesrelated = document.querySelector("#related-text")
allT = document.querySelector("#all")










#tracklist for individual mixtapes

#list of dict
mixtapes = [{'name0': 'Friday Night Lights', 'artist0': 'J. Cole', 'wikipedialink0': "https://en.wikipedia.org/wiki/Friday_Night_Lights_(mixtape)", "fulltape0": "https://youtu.be/VasGUZ48wR0?si=bqUhMhBugNfzb760", "interviewlink0": "https://youtu.be/bvj_pownVRE?si=PUDfDKIl10J4_9Y2"},
    {'name1': 'Da Drought 3', 'artist1': 'Lil Wayne', 'wikipedialink1': "https://en.wikipedia.org/wiki/Da_Drought_2", "fulltape1": "https://youtu.be/SWe7cpcVrwE?si=lh9QN0Ux-JaVRu5Z", "interviewlink1": "https://youtu.be/VX0Cz5PHNhA?si=fkwa5LpVX43sPnxU"},
    {'name2': 'Young Sinatra: Undeniable', 'artist2': 'Logic', 'wikipedialink2': '', 'fulltape2': 'https://www.youtube.com/playlist?list=PL9y_aRAKmsdtBN4Bag8rFx2Dqait6skY6', 'interviewlink2': 'https://youtu.be/5UQy3OVo8nM?si=0GIXPXEeJ6z9AvKU'},
    {'name3': 'Amerikkkan Korruption', 'artist3': 'Capital STEEZ', 'wikipedialink3': 'https://en.wikipedia.org/wiki/Capital_Steez', 'fulltape3': 'https://youtu.be/4e6YKnRc5qs?si=wI2BhkpT8QANRI_6', 'interviewlink3': 'https://youtu.be/beC2-fSXl-M?si=8ZDtgBQHBmivy-cA'},
    {'name4': 'Almighty So', 'artist4': 'Chief Keef', 'wikipedialink4': 'https://en.wikipedia.org/wiki/Almighty_So', 'fulltape4': 'https://youtu.be/q6qn7mhneRE?si=ytbD_OVy7TE_-97p', 'interviewlink4': 'https://youtu.be/rqkOv2fz90c?si=Oq5Xomr0WUJ0eGiN'},
    {'name5': 'Guess Whos Back', 'artist5': '50 Cent', 'wikipedialink5': 'https://en.wikipedia.org/wiki/Guess_Who%27s_Back%3F', 'fulltape5': 'https://youtu.be/7whblqNDxgc?si=BPOhoJNiElVrSh4k', 'interviewlink5': 'https://youtu.be/8XLPmALSDg0?si=YgKWGi99eYEKDAx8'},
    {'name6': 'Overly Dedicated', 'artist6': 'Kendrick Lamar', 'wikipedialink6': 'https://en.wikipedia.org/wiki/Overly_Dedicated', 'fulltape6': "https://www.youtube.com/playlist?list=PL41OIs5fC_mtY3NWLj8EnVyzrAq5joaIM", 'interviewlink6': 'https://youtu.be/HbPYo3DapKc?si=3YteAlBqgOTl2hWL'},
    {'name7': 'The Warm Up', 'artist7': 'J. Cole', 'wikipedialink7': 'https://en.wikipedia.org/wiki/The_Warm_Up', 'fulltape7': 'https://youtu.be/327d8u8sy5o?si=4qIHrUitegz6XM5T', 'interviewlink7': 'https://youtu.be/PCDrSeUs4CI?si=LGfSvmyvPljApsiy'},
    {'name8': 'The Dedication', 'artist8': 'Lil Wayne', 'wikipedialink8': 'https://en.wikipedia.org/wiki/The_Dedication', 'fulltape8': 'https://www.youtube.com/playlist?list=PL9y_aRAKmsdvhqdHMkL9sAq10E8aMfQR-', 'interviewlink8': 'https://youtu.be/d0taxJMu3Ac?si=J-c8t0RhwLNVL4xt'},
    {'name9': 'Dedication 2', 'artist9': 'Lil Wayne', 'wikipedialink9': 'https://en.wikipedia.org/wiki/Dedication_1', 'fulltape9': 'https://youtu.be/H4wZNjQHboM?si=zBOLdAQkkkgc53lN', 'interviewlink9': 'https://youtu.be/d0taxJMu3Ac?si=LK7c8us0c7bT4LMi'},
    {'name10': 'Young Sinatra', 'artist10': 'Logic', 'wikipedialink10': 'https://en.wikipedia.org/wiki/Young_Sinatra_(mixtape)', 'fulltape10': 'https://www.youtube.com/playlist?list=PLmne27NsF0TB4JvOGwR-xahnSIlOEbIb5', 'interviewlink10': 'https://youtu.be/AGXQzSrlKQw?si=yWAr6ttNYj6OO1Td'},
    {'name11': 'Young Sinatra: Welcome To Forever', 'artist11': 'Logic', 'wikipedialink11': 'https://en.wikipedia.org/wiki/Young_Sinatra:_Welcome_to_Forever', 'fulltape11': 'https://www.youtube.com/playlist?list=PL9y_aRAKmsdsZdIwYCHyyw5roB0M5mQok', 'interviewlink11': 'https://youtu.be/Mo8b59lj7jE?si=SIDPsaOh2558PepV'},
    {'name12': 'Bastard', 'artist12': 'Tyler, The Creator', 'wikipedialink12': 'https://en.wikipedia.org/wiki/Bastard_(mixtape)', 'fulltape12': 'https://youtu.be/heGPdwJGo08?si=zQYutQ0TbFwS0wix', 'interviewlink12': 'https://youtu.be/w1fSnm2gPCM?si=h8Iwz0EmL6KdeISd'},
    {'name13': 'Nostalgia, Ultra', 'artist13': 'Frank Ocean', 'wikipedialink13': 'https://en.wikipedia.org/wiki/Nostalgia,_Ultra', 'fulltape13': 'https://youtu.be/TtdXD2E-03k?si=yDvAS7FpH5AEPpOR', 'interviewlink13': 'https://youtu.be/65amv0E_sgI?si=tOtXZ_EW0TVHU0Ai'},
    {'name14': 'Earl', 'artist14': 'Earl Sweatshirt', 'wikipedialink14': 'https://en.wikipedia.org/wiki/Earl_Sweatshirt', 'fulltape14': 'https://youtu.be/xd3FB2rtvp0?si=kYN7Ie3-VVS3RNcm', 'interviewlink14': 'https://youtu.be/4J7N98c7D-A?si=GvkQ-0DGqKgc9_9K'},
    {'name15': 'PEEP: The Aprocylapse', 'artist15': 'Pro Era', 'wikipedialink15': 'https://en.wikipedia.org/wiki/Pro_Era', 'fulltape15': 'https://youtu.be/LzLEX1M2BU0?si=88t7TdhTDhYCvk6c', 'interviewlink15': 'https://youtu.be/ZFHQ7Waq-Tg?si=ZvFI_jB3CbOmsp4M'},
    {'name16': 'Radical', 'artist16': 'Odd Future', 'wikipedialink16': 'https://en.wikipedia.org/wiki/Odd_Future', 'fulltape16': 'https://youtu.be/umplaBlyv1g?si=1ME1blEfLuORr8Aq', 'interviewlink16': 'https://youtu.be/TNcUm71T_Co?si=yhmJrpodXXLtuYNf'}]

#for diferent data structures version
mixtapes1 = [
    {'name': 'Friday Night Lights', 'artist': 'J. Cole', 'wikipedialink': "https://en.wikipedia.org/wiki/Friday_Night_Lights_(mixtape)", "fulltape": "https://youtu.be/VasGUZ48wR0?si=bqUhMhBugNfzb760", "interviewlink": "https://youtu.be/bvj_pownVRE?si=PUDfDKIl10J4_9Y2"},
    {'name': 'Da Drought 3', 'artist': 'Lil Wayne', 'wikipedialink': "https://en.wikipedia.org/wiki/Da_Drought_2", "fulltape": "https://youtu.be/SWe7cpcVrwE?si=lh9QN0Ux-JaVRu5Z", "interviewlink": "https://youtu.be/VX0Cz5PHNhA?si=fkwa5LpVX43sPnxU"},
    {'name': 'Young Sinatra: Undeniable', 'artist': 'Logic', 'wikipedialink': '', 'fulltape': 'https://www.youtube.com/playlist?list=PL9y_aRAKmsdtBN4Bag8rFx2Dqait6skY6', 'interviewlink': 'https://youtu.be/5UQy3OVo8nM?si=0GIXPXEeJ6z9AvKU'},
    {'name': 'Amerikkkan Korruption', 'artist': 'Capital STEEZ', 'wikipedialink': 'https://en.wikipedia.org/wiki/Capital_Steez', 'fulltape': 'https://youtu.be/4e6YKnRc5qs?si=wI2BhkpT8QANRI_6', 'interviewlink': 'https://youtu.be/beC2-fSXl-M?si=8ZDtgBQHBmivy-cA'},
    {'name': 'Almighty So', 'artist': 'Chief Keef', 'wikipedialink': 'https://en.wikipedia.org/wiki/Almighty_So', 'fulltape': 'https://youtu.be/q6qn7mhneRE?si=ytbD_OVy7TE_-97p', 'interviewlink': 'https://youtu.be/rqkOv2fz90c?si=Oq5Xomr0WUJ0eGiN'},
    {'name': 'Guess Whos Back', 'artist': '50 Cent', 'wikipedialink': 'https://en.wikipedia.org/wiki/Guess_Who%27s_Back%3F', 'fulltape': 'https://youtu.be/7whblqNDxgc?si=BPOhoJNiElVrSh4k', 'interviewlink': 'https://youtu.be/8XLPmALSDg0?si=YgKWGi99eYEKDAx8'},
    {'name': 'Overly Dedicated', 'artist': 'Kendrick Lamar', 'wikipedialink': 'https://en.wikipedia.org/wiki/Overly_Dedicated', 'fulltape': "https://www.youtube.com/playlist?list=PL41OIs5fC_mtY3NWLj8EnVyzrAq5joaIM", 'interviewlink': 'https://youtu.be/HbPYo3DapKc?si=3YteAlBqgOTl2hWL'},
    {'name': 'The Warm Up', 'artist': 'J. Cole', 'wikipedialink': 'https://en.wikipedia.org/wiki/The_Warm_Up', 'fulltape': 'https://youtu.be/327d8u8sy5o?si=4qIHrUitegz6XM5T', 'interviewlink': 'https://youtu.be/PCDrSeUs4CI?si=LGfSvmyvPljApsiy'},
    {'name': 'The Dedication', 'artist': 'Lil Wayne', 'wikipedialink': 'https://en.wikipedia.org/wiki/The_Dedication', 'fulltape': 'https://www.youtube.com/playlist?list=PL9y_aRAKmsdvhqdHMkL9sAq10E8aMfQR-', 'interviewlink': 'https://youtu.be/d0taxJMu3Ac?si=J-c8t0RhwLNVL4xt'},
    {'name': 'Dedication 2', 'artist': 'Lil Wayne', 'wikipedialink': 'https://en.wikipedia.org/wiki/Dedication_1', 'fulltape': 'https://youtu.be/H4wZNjQHboM?si=zBOLdAQkkkgc53lN', 'interviewlink': 'https://youtu.be/d0taxJMu3Ac?si=LK7c8us0c7bT4LMi'},
    {'name': 'Young Sinatra', 'artist': 'Logic', 'wikipedialink': 'https://en.wikipedia.org/wiki/Young_Sinatra_(mixtape)', 'fulltape': 'https://www.youtube.com/playlist?list=PLmne27NsF0TB4JvOGwR-xahnSIlOEbIb5', 'interviewlink': 'https://youtu.be/AGXQzSrlKQw?si=yWAr6ttNYj6OO1Td'},
    {'name': 'Young Sinatra: Welcome To Forever', 'artist': 'Logic', 'wikipedialink': 'https://en.wikipedia.org/wiki/Young_Sinatra:_Welcome_to_Forever', 'fulltape': 'https://www.youtube.com/playlist?list=PL9y_aRAKmsdsZdIwYCHyyw5roB0M5mQok', 'interviewlink': 'https://youtu.be/Mo8b59lj7jE?si=SIDPsaOh2558PepV'},
    {'name': 'Bastard', 'artist': 'Tyler, The Creator', 'wikipedialink': 'https://en.wikipedia.org/wiki/Bastard_(mixtape)', 'fulltape': 'https://youtu.be/heGPdwJGo08?si=zQYutQ0TbFwS0wix', 'interviewlink': 'https://youtu.be/w1fSnm2gPCM?si=h8Iwz0EmL6KdeISd'},
    {'name': 'Nostalgia, Ultra', 'artist': 'Frank Ocean', 'wikipedialink': 'https://en.wikipedia.org/wiki/Nostalgia,_Ultra', 'fulltape': 'https://youtu.be/TtdXD2E-03k?si=yDvAS7FpH5AEPpOR', 'interviewlink': 'https://youtu.be/65amv0E_sgI?si=tOtXZ_EW0TVHU0Ai'},
    {'name': 'Earl', 'artist': 'Earl Sweatshirt', 'wikipedialink': 'https://en.wikipedia.org/wiki/Earl_Sweatshirt', 'fulltape': 'https://youtu.be/xd3FB2rtvp0?si=kYN7Ie3-VVS3RNcm', 'interviewlink': 'https://youtu.be/4J7N98c7D-A?si=GvkQ-0DGqKgc9_9K'},
    {'name': 'PEEP: The Aprocylapse', 'artist': 'Pro Era', 'wikipedialink': 'https://en.wikipedia.org/wiki/Pro_Era', 'fulltape': 'https://youtu.be/LzLEX1M2BU0?si=88t7TdhTDhYCvk6c', 'interviewlink': 'https://youtu.be/ZFHQ7Waq-Tg?si=ZvFI_jB3CbOmsp4M'},
    {'name': 'Radical', 'artist': 'Odd Future', 'wikipedialink': 'https://en.wikipedia.org/wiki/Odd_Future', 'fulltape': 'https://youtu.be/umplaBlyv1g?si=1ME1blEfLuORr8Aq', 'interviewlink': 'https://youtu.be/TNcUm71T_Co?si=yhmJrpodXXLtuYNf'}
]

mixtapes_copy = mixtapes1.copy()




    

# Sort mixtapes using insertion sort
#insertion_sort()




#MERGE SORT
def merge_sort(mixtapes):
    if len(mixtapes) > 1:
        mid = len(mixtapes) // 2
        left_half = mixtapes[:mid]
        right_half = mixtapes[mid:]

        merge_sort(left_half)
        merge_sort(right_half)

        i = j = k = 0

        while i < len(left_half) and j < len(right_half):
            if left_half[i]['name'] < right_half[j]['name']:
                mixtapes1[k] = left_half[i]
                i += 1
            else:
                mixtapes[k] = right_half[j]
                j += 1
            k += 1

        while i < len(left_half):
            mixtapes[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            mixtapes[k] = right_half[j]
            j += 1
            k += 1


# Sort mixtapes using merge sort
#merge_sort()

def displayMixtapeDetailsAlphabet(mixtapes):
# Display mixtapes in alphabetical order
    #alphabetical_mixtapes = "Mixtapes in alphabetical order:\n"
    for mixtape in mixtapes:
            mixtapetitle.innerText = f"{mixtape['name']}" + " by  " + f"{mixtape['artist']}"
            fulltapeBtn.innerText = f"Fulltape Link: {mixtape['fulltape']}"
            wikipediaBtn.innerText = f"Wikipedia Link: {mixtape['wikipedialink']}"
            interviewBtn.innerText = f"Interview Link: {mixtape['interviewlink']}"
            print(f"{mixtape[f'name']}")
            #for each elements id with "mixtapeTitle", do this 
            print(f"{mixtape[f'artist']}")
            print(f"Fulltape Link: {mixtape[f'fulltape']}")
            print(f"Wikipedia Link: {mixtape[f'wikipedialink']}")
            print(f"Interview Link: {mixtape[f'interviewlink']}")
            print("\n")
    



#BUBBLE SORT
def bubble_sort(mixtapes1):
    n = len(mixtapes1)

    for i in range(n):
        for j in range(0, n - i - 1):
            if mixtapes1[j]['name'].lower() > mixtapes1[j + 1]['name'].lower():
                mixtapes1[j], mixtapes1[j + 1] = mixtapes1[j + 1], mixtapes1[j]

# Sort mixtapes using bubble sort
#bubble_sort()




#QUICK SORT
def quicksort(mixtape,low, high):
    if low < high:
        # Partition the mixtapes and get the pivot index
        pivot_index = partition(mixtape, low, high)

        # Recursively sort the sublists before and after the pivot
        quicksort(mixtape, low, pivot_index)
        quicksort(mixtape, pivot_index + 1, high)

# Function to partition the mixtapes and return the pivot index
def partition(mixtapes, low, high):
    pivot = mixtapes[low]['name']
    left = low + 1
    right = high

    done = False
    while not done:
        while left <= right and mixtapes[left]['name'] <= pivot:
            left = left + 1
        while mixtapes[right]['name'] >= pivot and right >= left:
            right = right - 1
        if right < left:
            done = True
        else:
            # Swap mixtapes[left] and mixtapes[right]
            mixtapes[left], mixtapes[right] = mixtapes[right], mixtapes[left]

    # Swap mixtapes[low] and mixtapes[right]
    mixtapes[low], mixtapes[right] = mixtapes[right], mixtapes[low]

    return right

# Sort mixtapes using quicksort
#quicksort(0, len(mixtapes1) - 1)

# Display mixtapes in alphabetical order




#HEAP SORT
def heapsort(mixtapes1):
    n = len(mixtapes1)

    # Build a max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(n, i)

    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        mixtapes1[i], mixtapes1[0] = mixtapes1[0], mixtapes1[i]  # Swap
        heapify(i, 0)

# Function to heapify a subtree rooted at index i
def heapify(n, i):
    largest = i
    left_child = 2 * i + 1
    right_child = 2 * i + 2

    # Check if left child exists and is greater than root
    if left_child < n and mixtapes1[left_child]['name'] > mixtapes1[largest]['name']:
        largest = left_child

    # Check if right child exists and is greater than the largest so far
    if right_child < n and mixtapes1[right_child]['name'] > mixtapes1[largest]['name']:
        largest = right_child

    # Change root if needed
    if largest != i:
        mixtapes1[i], mixtapes1[largest] = mixtapes1[largest], mixtapes1[i]  # Swap
        heapify(n, largest)

# Sort mixtapes using heapsort
#heapsort()



#'''
def insertion_sort_similarity(mixtapes, matches):
    for i in range(1, len(matches)):
        key = matches[i]
        j = i - 1
        while j >= 0 and key[1] < matches[j][1]:  
            matches[j + 1] = matches[j]
            j -= 1
        matches[j + 1] = key

    # Get the indices of mixtapes in the sorted order
    sorted_indices = [index for index, _ in matches]
    return sorted_indices

def merge_sortSimilarity(arr, key):
    if len(arr) > 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        merge_sortSimilarity(left_half, key)
        merge_sortSimilarity(right_half, key)

        i = j = k = 0

        while i < len(left_half) and j < len(right_half):
            if left_half[i][key] < right_half[j][key]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1

        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1

def heapSimilarity(arr, n, i, key):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left][key] > arr[largest][key]:
        largest = left

    if right < n and arr[right][key] > arr[largest][key]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapSimilarity(arr, n, largest, key)

def heap_sortSimilarity(arr, key):
    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        heapSimilarity(arr, n, i, key)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapSimilarity(arr, i, 0, key)






def bubble_sortSimilarity(mixtapes, key):
    n = len(mixtapes)

    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if mixtapes[j][key] > mixtapes[j + 1][key]:
                mixtapes[j], mixtapes[j + 1] = mixtapes[j + 1], mixtapes[j]


def selection_sortSimilarity(mixtapes, key):
    n = len(mixtapes)

    for i in range(n):
        min_index = i
        for j in range(i + 1, n):
            if mixtapes[j][key] < mixtapes[min_index][key]:
                min_index = j

        mixtapes[i], mixtapes[min_index] = mixtapes[min_index], mixtapes[i]

#'''
#''''''
def partitionSimilarity(arr, low, high, key):
    i = low - 1
    pivot = arr[high][key]

    for j in range(low, high):
        if arr[j][key] <= pivot:  # Change the condition to reverse the order
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


def quick_sortSimilarity(arr, low, high, key):
    if low < high:
        pi = partitionSimilarity(arr, low, high, key)

        quick_sortSimilarity(arr, low, pi - 1, key)
        quick_sortSimilarity(arr, pi + 1, high, key)

#DEFAULT SEARCH; sort mixtapes by similarity using difflib
def findMixtape(input_name):
     # Extract mixtape names and artists from the dictionary
    mixtape_info = [(mixtape[f'name{i}'], mixtape[f'artist{i}']) for i, mixtape in enumerate(mixtapes)]
    
    # Use difflib to find similarity ratios
    matcher = difflib.SequenceMatcher()
    matches = []
    start = time.time()
    #linear search
    for i, (name, artist) in enumerate(mixtape_info):
        matcher.set_seqs(input_name.lower(), name.lower())
        similarity_ratio = matcher.ratio()
        matches.append((i, similarity_ratio))
    end = time.time()
    print("Linear: " + str(end-start))
    # Sort matches by similarity ratio in descending order
    '''
    #insertion sort
    sorted_indices = insertion_sort_similarity(mixtapes_copy, matches)
    #merge sort
    sorted_indices = reverse_merge_sort_similarity(mixtapes, matches)
    #reverse
    merge_sortSimiliarity(matches, key=1)
    #heap sort
    heap_sortSimilarity(matches, key=1)
    #quicksort
    quick_sortSimilarity(matches, 0, len(matches) - 1, key=1)
    #bubblesort
    bubble_sortSimilarity(matches, key=1)
    #selection sort
    selection_sort_mixtapes(matches, key=1)
    #reverse
    selection_sort_mixtapes_reverse(matches, key=1)
   
    #DEFAULT
    sorted_matches = sorted(matches, key=lambda x: x[1])
    # Get the indices of mixtapes in the sorted order
    sorted_indices = [index for index, _ in sorted_matches]
    '''

    
    quick_sortSimilarity(matches, 0, len(matches) - 1, key=1)



    sortedIndexes = [index for index, _ in matches]
    
    print("Done!" + str(sortedIndexes))
    return sortedIndexes


#put mixtape details on links on search results
def searchMixtapes(sortedarr):
    # Check if there are matching mixtapes
    if not sortedarr:
        print("No matching mixtapes found.")
        allT.innerText("No matching mixtapes found.")
        return

    for index in sortedarr[5:]:
        mixtape = mixtapes[index]
        #print(f"{mixtape[f'name{index}']}")
        #for each elements id with "mixtapeTitle", do this 
        mixtapetitle.innerText = f"{mixtape[f'name{index}']}" + " by  " + f"{mixtape[f'artist{index}']}"
        fulltapeBtn.innerText = f"Fulltape Link: {mixtape[f'fulltape{index}']}"
        wikipediaBtn.innerText = f"Wikipedia Link: {mixtape[f'wikipedialink{index}']}"
        interviewBtn.innerText = f"Interview Link: {mixtape[f'interviewlink{index}']}"
        #Print details for each matching mixtape
        print(f"{mixtape[f'name{index}']}")
        print(f"{mixtape[f'artist{index}']}")
        print(f"Fulltape Link: {mixtape[f'fulltape{index}']}")
        print(f"Wikipedia Link: {mixtape[f'wikipedialink{index}']}")
        print(f"Interview Link: {mixtape[f'interviewlink{index}']}")
        print("\n")


def printAllTest():
    for index, mixtape in enumerate(mixtapes):
        name_key = f'name{index}'
        artist_key = f'artist{index}'
        wikipedialink_key = f'wikipedialink{index}'
        fulltape_key = f'fulltape{index}'
        interviewlink_key = f'interviewlink{index}'

        print(f"Mixtape {index + 1}:")
        print(f"Name: {mixtape[name_key]}")
        print(f"Artist: {mixtape[artist_key]}")
        print(f"Wikipedia Link: {mixtape[wikipedialink_key]}")
        print(f"Full Tape Link: {mixtape[fulltape_key]}")
        print(f"Interview Link: {mixtape[interviewlink_key]}")
        print()



#filter by ALL
def showAllMixtapes():
  for index, mixtape in enumerate(mixtapes):
        name_key = f'name{index}'
        artist_key = f'artist{index}'
        wikipedialink_key = f'wikipedialink{index}'
        fulltape_key = f'fulltape{index}'
        interviewlink_key = f'interviewlink{index}'

        mixtapetitle.innerText = f"{mixtape[name_key]}" + " by  " + f"{mixtape[artist_key]}"
        fulltapeBtn.innerText = f"Fulltape Link: {mixtape[fulltape_key]}"
        wikipediaBtn.innerText = f"Wikipedia Link: {mixtape[wikipedialink_key]}"
        interviewBtn.innerText = f"Interview Link: {mixtape[interviewlink_key]}"

       
#'''
#Search for mixtapes on site 

def quicksort_reverse(mixtapes, low, high):
    if low < high:
        # Partition the mixtapes and get the pivot index
        pivot_index = partition_reverse(mixtapes, low, high)

        # Recursively sort the sublists after and before the pivot
        quicksort_reverse(mixtapes, pivot_index + 1, high)
        quicksort_reverse(mixtapes, low, pivot_index)

# Function to partition the mixtapes and return the pivot index
def partition_reverse(mixtapes, low, high):
    pivot = mixtapes[low]['name']
    left = low + 1
    right = high

    done = False
    while not done:
        while left <= right and mixtapes[left]['name'] >= pivot:
            left = left + 1
        while mixtapes[right]['name'] <= pivot and right >= left:
            right = right - 1
        if right < left:
            done = True
        else:
            # Swap mixtapes[left] and mixtapes[right]
            mixtapes[left], mixtapes[right] = mixtapes[right], mixtapes[left]

    # Swap mixtapes[low] and mixtapes[right]
    mixtapes[low], mixtapes[right] = mixtapes[right], mixtapes[low]

    return right



def merge_sort_reverse(mixtapes):
    if len(mixtapes) <= 1:
        return mixtapes

    # Split the list in half
    mid = len(mixtapes) // 2
    left_half = mixtapes[:mid]
    right_half = mixtapes[mid:]

    # Recursively apply merge_sort_reverse to both halves
    left_half = merge_sort_reverse(left_half)
    right_half = merge_sort_reverse(right_half)

    # Merge the two sorted halves in reverse order
    return merge_reverse(left_half, right_half)

def merge_reverse(left, right):
    result = []
    left_index, right_index = 0, 0

    # Traverse both lists and merge in reverse order
    while left_index < len(left) and right_index < len(right):
        if left[left_index]['name'] >= right[right_index]['name']:
            result.append(left[left_index])
            left_index += 1
        else:
            result.append(right[right_index])
            right_index += 1

    # Add the remaining elements from left, if any
    while left_index < len(left):
        result.append(left[left_index])
        left_index += 1

    # Add the remaining elements from right, if any
    while right_index < len(right):
        result.append(right[right_index])
        right_index += 1

    return result


def heapify_reverse(mixtapes, n, i):
    largest = i
    left_child = 2 * i + 1
    right_child = 2 * i + 2

    if left_child < n and mixtapes[left_child]['name'] > mixtapes[largest]['name']:
        largest = left_child

    if right_child < n and mixtapes[right_child]['name'] > mixtapes[largest]['name']:
        largest = right_child

    if largest != i:
        mixtapes[i], mixtapes[largest] = mixtapes[largest], mixtapes[i]
        heapify_reverse(mixtapes, n, largest)

def heap_sort_reverse(mixtapes):
    n = len(mixtapes)

    # Build a max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify_reverse(mixtapes, n, i)

    # Extract elements from the heap in reverse order
    for i in range(n - 1, 0, -1):
        mixtapes[i], mixtapes[0] = mixtapes[0], mixtapes[i]
        heapify_reverse(mixtapes, i, 0)

def binary_search(arr, target):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid]['name'] == target:
            return mid
        elif arr[mid]['name'] < target:
            low = mid + 1
        else:
            high = mid - 1

    return low

def insertion_sort_alphabetical(mixtapes):
    for i in range(1, len(mixtapes)):
        key = mixtapes[i]
        j = i - 1
        while j >= 0 and key['name'] < mixtapes[j]['name']:
            mixtapes[j + 1] = mixtapes[j]
            j -= 1
        mixtapes[j + 1] = key
'''

'''

'''
'''

#'''
def binary_search(arr, target):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid]['name'] == target:
            return mid
        elif arr[mid]['name'] < target:
            low = mid + 1
        else:
            high = mid - 1

    return low



def binary_search_reverse(arr, target):
    low, high = 0, len(arr)

    while low < high:
        mid = (low + high) // 2
        if arr[mid]['name'] >= target:
            low = mid + 1
        else:
            high = mid

    return low


def binary_search_all(arr):
    # Sort the mixtapes list based on the 'name' attribute
    arr.sort(key=lambda x: x['name'])

    # Initialize an empty list to store indices in the sorted order
    sorted_indices = []

    for i, mixtape in enumerate(arr):
        # Binary search for the current mixtape in the sorted list
        index_to_insert = binary_search(arr, mixtape['name'])

        # Append the index to the sorted indices list
        sorted_indices.insert(index_to_insert, i)

    return sorted_indices

def binary_search_reverse_all(arr):
    # Sort the mixtapes list based on the 'name' attribute in reverse order
    arr.sort(key=lambda x: x['name'], reverse=True)

    # Initialize an empty list to store indices in the reverse-sorted order
    reverse_sorted_indices = []

    for i, mixtape in enumerate(arr):
        # Binary search for the current mixtape in the sorted list
        index_to_insert = binary_search_reverse(arr, mixtape['name'])

        # Append the index to the reverse-sorted indices list
        reverse_sorted_indices.insert(index_to_insert, i)



#'''


def insertion_sort_by_name_reverse(mixtapes):
    for i in range(1, len(mixtapes)):
        key = mixtapes[i]
        j = i - 1
        while j >= 0 and key['name'] > mixtapes[j]['name']:
            mixtapes[j + 1] = mixtapes[j]
            j -= 1
        mixtapes[j + 1] = key


def bubble_sort_reverse(mixtapes):
    n = len(mixtapes)

    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if mixtapes[j]['name'] < mixtapes[j + 1]['name']:
                # Swap if the element found is greater than the next element
                mixtapes[j], mixtapes[j + 1] = mixtapes[j + 1], mixtapes[j]


'''

'''



@when("click", "#search-button")
def click_handler(event):
    input_text = document.querySelector("#search-bar")
    txt = input_text.value
    mixtapesrelated = document.querySelector("#related-text")

    if txt == "all":
            mixtapesrelated.innerText="Mixtapes related to: all mixtapes"

            start = time.time()

            showAllMixtapes()


            end = time.time()
            print("All: " + str(end - start))
            start = time.time()

            printAllTest()

            end = time.time()
            print("AllTest: " + str(end - start))

            
    elif txt=="":
        allT.innerText="No text was entered"
        mixtapesrelated.innerText="Mixtapes related to: "

    elif txt=="sorted":
        mixtapesrelated.innerText = "Sorted mixtapes in alphabetical order:"
        allT.innerText=""
        #displayMixtapeDetailsAlphabet()
        #insertion sort
        #displayMixtapesInsertion(mixtapes1)
        #bubble sort
        #bubble_sort()
        #bubble_sort_reverse(mixtapes_copy)
        # Call the binary_search_all function to get the sorted indices
        #binary_search_reverse_all(mixtapes_copy)
        start = time.time()
        insertion_sort_by_name_reverse(mixtapes_copy)
        displayMixtapeDetailsAlphabet(mixtapes_copy)
        end = time.time()
        print("Linear Search Insertion Sort: " + str(end - start))
        #quicksort(mixtapes1, 0, len(mixtapes1) - 1)
        #quicksort_reverse(mixtapes1, 0, len(mixtapes1) - 1)
        #merge sort
        #merge_sort(mixtapes1)
        #heap_sort_reverse(mixtapes1)
        #displayMixtapeDetailsAlphabet(mixtapes1)
        



     
    
    else:
        mixtapesrelated.innerText = "Mixtapes related to: " + txt

        allT.innerText = ""


        start = time.time()
        searchMixtapes(findMixtape(txt))
        


        end = time.time()
        print("Mixtapes similar to searched: " + str(end - start))