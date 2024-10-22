require "test_helper"

class DiagnosisControllerTest < ActionDispatch::IntegrationTest
  test "should get start" do
    get diagnosis_start_url
    assert_response :success
  end
end
