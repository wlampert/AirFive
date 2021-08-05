import unittest
import time
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By

#Script needs to wait until frontend and selenium-chrome containers are running
time.sleep(300)

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--incognito")
#chrome_options.add_argument("--headless")
capabilities = chrome_options.to_capabilities()


class TestHomePage(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Remote(command_executor='http://selenium-chrome:4444/wd/hub', desired_capabilities=DesiredCapabilities.CHROME)

    def test_react_connection(self):
        driver = self.driver
        driver.get("http://proxy:9300/")
        self.assertEquals("React App",driver.title)

    def test_home_page(self):
        driver = self.driver
        driver.get("http://proxy:9300/")
        elem = driver.find_element_by_xpath('//*[@id="root"]/div/div[1]/div/ul/li[2]/button')
        self.assertEquals("Sign Up",elem.text)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
