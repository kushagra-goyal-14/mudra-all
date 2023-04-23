import pandas as pd
import numpy as np
import pickle
from sklearn import linear_model
from sklearn.model_selection import train_test_split


df = pd.read_csv('financedata.csv')

X = df[["date"]]
Y = df[["food", "health", "luxury", "travel", "others"]]


reg = linear_model.LinearRegression()
reg.fit(X, Y)

pickle.dump(reg, open("model.pkl", "wb"))
result = reg.predict([[202304]])
retval = 0
for i in result[0]:
	retval += i

print(int(retval))