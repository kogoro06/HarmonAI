require "test_helper"

class IntroduceControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get introduce_index_url
    assert_response :success
  end
end
