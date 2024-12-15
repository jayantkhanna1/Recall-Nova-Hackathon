from passlib.hash import sha512_crypt as sha512
pwd = "demo"
pwd = sha512.hash(pwd, rounds=5000,salt="recallapp")
print(pwd)