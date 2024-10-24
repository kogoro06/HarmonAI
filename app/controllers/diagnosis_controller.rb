require 'base64'

class DiagnosisController < ApplicationController
  def upload_audio
    if params[:audio_data].present?
      audio_data = params[:audio_data].split(',')[1] # Base64データ部分を取り出す
      audio_binary = Base64.decode64(audio_data)
      
      # 音声ファイルを保存する（例: public/audioフォルダに保存）
      File.open(Rails.root.join('public', 'audio', "recording_#{Time.now.to_i}.webm"), 'wb') do |file|
        file.write(audio_binary)
      end

      flash[:notice] = "Audio uploaded successfully!"
    else
      flash[:alert] = "Audio upload failed."
    end

    redirect_to diagnosis_start_path
  end
end
